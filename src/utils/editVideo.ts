import { firebase } from "FirebaseConfig";
import { Video } from "types/Video";

type Arg = {
  uid: string;
  video: Video;
  db: firebase.firestore.Firestore;
  comment: string;
};

export const editVideo = async ({ db, uid, video, comment }: Arg) => {
  const videoRef = db
    .collection("users")
    .doc(uid)
    .collection("videos")
    .doc(video.id);
  try {
    await videoRef.set(
      {
        comment,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  } catch (err) {
    console.log(err);

    return null;
  }
};
