import { AppUser } from "types/AppUser";
import { firebase } from "FirebaseConfig";

type Arg = {
  db: firebase.firestore.Firestore;
  currentUser: AppUser;
  unFollowUserId: string;
};

export const unFollow = async ({ currentUser, unFollowUserId, db }: Arg) => {
  const userColRef = db.collection("users");
  const followDocRef = userColRef
    .doc(currentUser.uid)
    .collection("following")
    .doc(unFollowUserId);
  const followedDocRef = userColRef
    .doc(unFollowUserId)
    .collection("followers")
    .doc(currentUser.uid);
  const batch = db.batch();

  batch.delete(followDocRef);
  batch.delete(followedDocRef);
  await batch.commit();
  console.log("unFollow");
  // return result;
};
