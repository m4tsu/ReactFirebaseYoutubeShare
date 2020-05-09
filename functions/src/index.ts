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
    displayName: string;
    photoUrl: string;
  };
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
};

type User = {
  uid: string;
  displayName: string;
  screenName: string;
  photoUrl: string;
};

// interface Post {
//   readonly title: string;
//   readonly body: string;
// }

// interface RootPost extends Post {
//   authorRef?: FirebaseFirestore.DocumentReference;
// }

async function copyToTimelineWithUsersVideoSnapshot(
  snapshot: FirebaseFirestore.DocumentSnapshot,
  context: functions.EventContext
) {
  const videoDocId = snapshot.id;
  const { userId } = context.params;
  const video = snapshot.data() as Video;
  console.log(video);
  const userDoc = await firestore
    .collection("users")
    .doc(userId)
    .get();
  console.log(userDoc.data());
  const { displayName, photoUrl } = userDoc.data() as User;
  video.user = {
    displayName,
    photoUrl,
  };
  await firestore
    .collection("users")
    .doc(userId)
    .collection("timeline")
    .doc(videoDocId)
    .set(video, { merge: true });
}

export const onUsersVideoCreate = functions
  .region("asia-northeast1")
  .firestore.document("/users/{userId}/videos/{videoDocId}")
  .onCreate(async (snapshot, context) => {
    await copyToTimelineWithUsersVideoSnapshot(snapshot, context);
  });
// export const onUsersPostUpdate = functions.firestore
//   .document("/users/{userId}/posts/{postId}")
//   .onUpdate(async (change, context) => {
//     await copyToRootWithUsersPostSnapshot(change.after, context);
//   });
