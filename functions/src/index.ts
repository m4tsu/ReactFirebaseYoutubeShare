/* eslint-disable prettier/prettier */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// import { incrementLikeCount } from "./likeVideoCount";

admin.initializeApp();
export const firestore = admin.firestore();

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

// type User = {
//   uid: string;
//   displayName: string;
//   screenName: string;
//   photoURL: string;
// };

type Tag = {
  label: string;
};

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
  // likeのときはTimelineのUpdateしない
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
  // context: functions.EventContext
) => {
  const likeVideoDoc = snapshot.data();
  if (!likeVideoDoc) return;
  const { uid, videoDocId } = likeVideoDoc;
  // const { userId, videoDocId } = context.params;
  await firestore
    .collection("users")
    .doc(uid)
    .collection("videos")
    .doc(videoDocId)
    .update({ likeCount: admin.firestore.FieldValue.increment(1) });
};

const decrementLikeCount = async (
  snapshot: FirebaseFirestore.DocumentSnapshot
  // context: functions.EventContext
) => {
  const likeVideoDoc = snapshot.data();
  if (!likeVideoDoc) return;
  const { uid, videoDocId } = likeVideoDoc;
  await firestore
    .collection("users")
    .doc(uid)
    .collection("videos")
    .doc(videoDocId)
    .update({ likeCount: admin.firestore.FieldValue.increment(-1) });
};

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
