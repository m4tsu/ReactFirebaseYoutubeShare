import { firebase } from "FirebaseConfig";
import { AppUser } from "types/AppUser";

type Arg = {
  db: firebase.firestore.Firestore;
  currentUser: AppUser;
  likedVideoUserId: string;
  videoDocId: string;
};

export const unlikeVideo = async ({
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

    batch.delete(likeVideoDoc);
    batch.delete(likedUserDoc);

    batch.commit();
  } catch (err) {
    console.log(err);
  }
};
