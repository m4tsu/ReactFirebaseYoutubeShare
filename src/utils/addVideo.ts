import { AppUser } from "types/AppUser";
import { NewVideo } from "types/Video";
import { firebase } from "FirebaseConfig";

type Arg = NewVideo & {
  db: firebase.firestore.Firestore;
  currentUser: AppUser;
};

export const addVideo = async ({
  db,
  currentUser,
  videoId,
  type,
  comment,
}: Arg) => {
  const videosRef = db
    .collection("users")
    .doc(currentUser.uid)
    .collection("videos");

  try {
    const videoRef = await videosRef.add({
      user: db.collection("users").doc(currentUser.uid),
      videoId,
      type,
      comment,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log(videoRef);
  } catch (err) {
    console.log(err);
  }

  // return vi;
};
