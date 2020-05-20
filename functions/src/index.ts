/* eslint-disable prettier/prettier */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
type Video = {
  videoId: string;
  type: "video" | "playlist";
  comment: string;
  user?: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  tags: string[]; // Tag.label の配列
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
};

type User = {
  uid: string;
  displayName: string;
  screenName: string;
  photoURL: string;
};

type Tag = {
  label: string;
};

async function copyToTimelineWithUsersVideoSnapshot(
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) {
  const videoDocId = snapshot.id;
  const { userId } = context.params;
  const video = snapshot.data() as Video;
  const userDoc = await firestore
    .collection("users")
    .doc(userId)
    .get();
  const { displayName, photoURL, uid } = userDoc.data() as User;
  video.user = {
    uid,
    displayName,
    photoURL,
  };

  const followersSnap = await firestore
    .collection("users")
    .doc(userId)
    .collection("followers")
    .get();
  followersSnap.docs.forEach(async (doc) => {
    const followerCol = firestore.collection("users");
    const followerDoc = followerCol.doc(doc.id);
    const timelineRef = followerDoc.collection("timeline");
    timelineRef.doc(videoDocId).set(video, { merge: true });
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
    const followerCol = firestore.collection("users");
    const followerDoc = followerCol.doc(doc.id);
    const timelineRef = followerDoc.collection("timeline");
    timelineRef.doc(videoDocId).delete();
  });
}

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
    await copyToTimelineWithUsersVideoSnapshot(change.after, context);
  });

export const onUsersVideoDelete = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}/videos/{videoDocId}")
  .onDelete(async (snapshot, context) => {
    await deleteToTimelineWithUsersVideoSnapshot(snapshot, context);
  });

export const onUsersTagDelete = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}/tags/{tagId}")
  .onDelete(async (snapshot, context) => {
    await deleteToUserVideosWithUsersTagSnapshot(snapshot, context);
  });

// export const onUsersPostUpdate = functions.firestore
//   .document("/users/{userId}/posts/{postId}")
//   .onUpdate(async (change, context) => {
//     await copyToRootWithUsersPostSnapshot(change.after, context);
//   });
