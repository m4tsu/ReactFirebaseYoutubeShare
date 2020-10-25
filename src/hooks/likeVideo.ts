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
  const currentUserDocRef = db.collection("users").doc(currentUser.uid);
  const likedVideoDocRef = db
    .collection("users")
    .doc(likedVideoUserId)
    .collection("videos")
    .doc(videoDocId);
  const likeVideoDoc = currentUserDocRef
    .collection("likeVideos")
    .doc(videoDocId);
  const likedUserDoc = likedVideoDocRef
    .collection("likedUsers")
    .doc(currentUser.uid);

  try {
    const batch = db.batch();

    batch.set(likeVideoDoc, {
      videoRef: likedVideoDocRef,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    batch.set(likedUserDoc, {
      userRef: currentUserDocRef,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    batch.commit();
  } catch (err) {
    console.log(err);
  }
};
