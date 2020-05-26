import { firebase } from "FirebaseConfig";
import { AppUser } from "types/AppUser";

type Arg = {
  db: firebase.firestore.Firestore;
  currentUser: AppUser;
  likedVideoUserId: string;
  videoDocId: string;
};

export const likeVideo = async ({
  db,
  currentUser,
  likedVideoUserId,
  videoDocId,
}: Arg) => {
  const likeVideoDoc = db
    .collection("users")
    .doc(currentUser.uid)
    .collection("likeVideos")
    .doc(videoDocId);
  const likedUserDoc = db
    .collection("users")
    .doc(likedVideoUserId)
    .collection("videos")
    .doc(videoDocId)
    .collection("likedUsers")
    .doc(currentUser.uid);

  try {
    const batch = db.batch();

    batch.set(likeVideoDoc, {
      videoDocId,
      uid: likedVideoUserId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    batch.set(likedUserDoc, {
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
    });

    batch.commit();
  } catch (err) {
    console.log(err);
  }
};
