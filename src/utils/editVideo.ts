import { firebase } from "FirebaseConfig";

type Arg = {
  uid: string;
  id: string;
  db: firebase.firestore.Firestore;
  comment: string;
};

export const editVideo = async ({ db, uid, id, comment }: Arg) => {
  const videoRef = db.collection("users").doc(uid).collection("videos").doc(id);
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
  }
};
