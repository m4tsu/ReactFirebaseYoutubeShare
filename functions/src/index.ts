/* eslint-disable prettier/prettier */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import { Parser } from "xml2js";

admin.initializeApp();
export const firestore = admin.firestore();

type User = {
  uid: string;
  displayName: string;
  photoURL: string;
  screenName: string;
  createdAt: string;
  updatedAt: string;
};

type Video = {
  videoId: string;
  type: "video" | "playlist";
  comment: string;
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  tags: string[]; // Tag.label の配列
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
};

type Tag = {
  label: string;
};

// ユーザー情報変更時に動画のuserに反映する
async function copyToVideosWithUserSnapshot(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
) {
  const { userId } = context.params;
  const user = change.after.data() as User;
  const { uid, displayName, photoURL } = user;

  const batchArray: admin.firestore.WriteBatch[] = [];
  batchArray.push(firestore.batch());
  let operationCounter = 0;
  let batchIndex = 0;

  const videosSnapshot = await firestore
    .collection("users")
    .doc(userId)
    .collection("videos")
    .get();

  videosSnapshot.forEach((doc) => {
    batchArray[batchIndex].set(
      doc.ref,
      {
        user: {
          uid,
          displayName,
          photoURL,
        },
      },
      { merge: true }
    );
    operationCounter += 1;

    if (operationCounter === 499) {
      batchArray.push(firestore.batch());
      batchIndex += 1;
      operationCounter = 0;
    }
  });

  batchArray.forEach(async (batch) => {
    await batch.commit();
  });
}

// 動画登録時にタイムラインにコピーを入れる
async function copyToTimelineWithUsersVideoSnapshot(
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) {
  const videoDocId = snapshot.id;
  const { userId } = context.params;
  const video = snapshot.data() as Video;
  const videoRef = snapshot.ref;

  const followersSnap = await firestore
    .collection("users")
    .doc(userId)
    .collection("followers")
    .get();
  followersSnap.docs.forEach(async (doc) => {
    firestore
      .collection("users")
      .doc(doc.id)
      .collection("timeline")
      .doc(videoDocId)
      .set({ videoRef, updatedAt: video.updatedAt }, { merge: true });
  });
}

async function updateToTimelineWithUsersVideoSnapshot(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>,
  context: functions.EventContext
) {
  const newVideo = change.after.data() as Video;
  const prevVideo = change.before.data() as Video;
  if (!newVideo.updatedAt.isEqual(prevVideo.updatedAt)) {
    copyToTimelineWithUsersVideoSnapshot(change.after, context);
  }
}

async function deleteToTimelineWithUsersVideoSnapshot(
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) {
  const videoDocId = snapshot.id;
  const { userId } = context.params;

  const followersSnap = await firestore
    .collection("users")
    .doc(userId)
    .collection("followers")
    .get();
  followersSnap.docs.forEach(async (doc) => {
    firestore
      .collection("users")
      .doc(doc.id)
      .collection("timeline")
      .doc(videoDocId)
      .delete();
  });
}

// タグ削除時にVideoに反映する
async function deleteToUserVideosWithUsersTagSnapshot(
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) {
  const { userId } = context.params;
  const tag = snapshot.data() as Tag;

  const videosColRef = firestore
    .collection("users")
    .doc(userId)
    .collection("videos");

  const taggedVideosSnap = await videosColRef
    .where("tags", "array-contains", tag.label)
    .get();

  taggedVideosSnap.docs.forEach(async (doc) => {
    doc.ref.update({ tags: admin.firestore.FieldValue.arrayRemove(tag.label) });
  });
}

const deleteToLikedUsersWithVideoSnapshot = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { userId, videoDocId } = context.params;
  const batchArray: admin.firestore.WriteBatch[] = [];
  batchArray.push(firestore.batch());
  let operationCounter = 0;
  let batchIndex = 0;

  const likedUsersSnapshot = await firestore
    .collection("users")
    .doc(userId)
    .collection("videos")
    .doc(videoDocId)
    .collection("likedUsers")
    .get();

  likedUsersSnapshot.forEach((doc) => {
    batchArray[batchIndex].delete(doc.ref);
    operationCounter += 1;

    if (operationCounter === 499) {
      batchArray.push(firestore.batch());
      batchIndex += 1;
      operationCounter = 0;
    }
  });

  batchArray.forEach(async (batch) => {
    await batch.commit();
  });
};

const deleteToLikeVideosWithVideoSnapshot = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { videoDocId } = context.params;
  const batchArray: admin.firestore.WriteBatch[] = [];
  batchArray.push(firestore.batch());
  let operationCounter = 0;
  let batchIndex = 0;

  const likeVideosSnapshot = await firestore
    .collectionGroup("likeVideos")
    .where("videoDocId", "==", videoDocId)
    .get();

  likeVideosSnapshot.forEach((doc) => {
    batchArray[batchIndex].delete(doc.ref);
    operationCounter += 1;

    if (operationCounter === 499) {
      batchArray.push(firestore.batch());
      batchIndex += 1;
      operationCounter = 0;
    }
  });

  batchArray.forEach(async (batch) => {
    await batch.commit();
  });
};

const incrementLikeCount = async (
  snapshot: FirebaseFirestore.DocumentSnapshot
) => {
  const likeVideoDoc = snapshot.data();
  if (!likeVideoDoc) return;
  const { videoRef } = likeVideoDoc;
  await firestore
    .doc(videoRef.path)
    .update({ likeCount: admin.firestore.FieldValue.increment(1) });
};

const decrementLikeCount = async (
  snapshot: FirebaseFirestore.DocumentSnapshot
) => {
  const likeVideoDoc = snapshot.data();
  if (!likeVideoDoc) return;
  const { videoRef } = likeVideoDoc;
  await firestore
    .doc(videoRef.path)
    .update({ likeCount: admin.firestore.FieldValue.increment(-1) });
};

const copyVideosToTimeline = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { userId, followingId } = context.params;
  const timelineRef = firestore
    .collection("users")
    .doc(userId)
    .collection("timeline");
  const videosSnapshot = await firestore
    .collection("users")
    .doc(followingId)
    .collection("videos")
    .get();
  const batchArray: admin.firestore.WriteBatch[] = [];
  batchArray.push(firestore.batch());
  let operationCounter = 0;
  let batchIndex = 0;

  videosSnapshot.forEach((doc) => {
    batchArray[batchIndex].set(timelineRef.doc(doc.id), {
      videoRef: doc.ref,
      updatedAt: doc.data().updatedAt,
    });
    operationCounter += 1;

    if (operationCounter === 499) {
      batchArray.push(firestore.batch());
      batchIndex += 1;
      operationCounter = 0;
    }
  });

  batchArray.forEach(async (batch) => {
    await batch.commit();
  });
};

const deleteVideosFromTimeline = async (
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) => {
  const { userId, followingId } = context.params;
  const timelineRef = firestore
    .collection("users")
    .doc(userId)
    .collection("timeline");
  const videosSnapshot = await firestore
    .collection("users")
    .doc(followingId)
    .collection("videos")
    .get();
  const batchArray: admin.firestore.WriteBatch[] = [];
  batchArray.push(firestore.batch());
  let operationCounter = 0;
  let batchIndex = 0;

  videosSnapshot.forEach((doc) => {
    batchArray[batchIndex].delete(timelineRef.doc(doc.id));
    operationCounter += 1;

    if (operationCounter === 499) {
      batchArray.push(firestore.batch());
      batchIndex += 1;
      operationCounter = 0;
    }
  });

  batchArray.forEach(async (batch) => {
    await batch.commit();
  });
};

export const onUserUpdate = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}")
  .onUpdate(async (change, context) => {
    await copyToVideosWithUserSnapshot(change, context);
  });

export const onUsersVideoCreate = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}/videos/{videoDocId}")
  .onCreate(async (snapshot, context) => {
    await copyToTimelineWithUsersVideoSnapshot(snapshot, context);
  });

export const onUsersVideoUpdate = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}/videos/{videoDocId}")
  .onUpdate(async (change, context) => {
    await updateToTimelineWithUsersVideoSnapshot(change, context);
  });

export const onUsersVideoDelete = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}/videos/{videoDocId}")
  .onDelete(async (snapshot, context) => {
    await deleteToTimelineWithUsersVideoSnapshot(snapshot, context);
    await deleteToLikedUsersWithVideoSnapshot(snapshot, context);
    await deleteToLikeVideosWithVideoSnapshot(snapshot, context);
  });

export const onUsersTagDelete = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}/tags/{tagId}")
  .onDelete(async (snapshot, context) => {
    await deleteToUserVideosWithUsersTagSnapshot(snapshot, context);
  });

export const onLikeVideoCreate = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}/likeVideos/{videoDocId}")
  .onCreate(async (snapshot) => {
    await incrementLikeCount(snapshot);
  });

export const onLikeVideoDelete = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}/likeVideos/{videoDocId}")
  .onDelete(async (snapshot) => {
    await decrementLikeCount(snapshot);
  });

export const onUsersFollowingCreate = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}/following/{followingId}")
  .onCreate(async (snapshot, context) => {
    await copyVideosToTimeline(snapshot, context);
  });

export const onUsersFollowingDelete = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}/following/{followingId}")
  .onDelete(async (snapshot, context) => {
    await deleteVideosFromTimeline(snapshot, context);
  });

export const getNicovideoTitle = functions
  .region("asia-northeast1")
  .https.onCall(async (data) => {
    if (data.videoId !== undefined) {
      const { videoId } = data;
      const fetchUrl = `https://ext.nicovideo.jp/api/getthumbinfo/${videoId}`;
      try {
        const result = await axios.get(fetchUrl);
        const xml = result.data;
        const parser = new Parser();
        const obj = await parser.parseStringPromise(xml);
        const title = obj.nicovideo_thumb_response.thumb[0].title[0];

        return { title };
      } catch (err) {
        console.log(err);

        return { title: null };
      }
    } else {
      console.log("no videoId");

      return { title: null };
    }
  });
