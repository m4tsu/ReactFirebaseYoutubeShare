import { AppUser } from "types/AppUser";
import { firebase } from "FirebaseConfig";

type Arg = {
  db: firebase.firestore.Firestore;
  currentUser: AppUser;
  followUserId: string;
};

export const follow = async ({ currentUser, followUserId, db }: Arg) => {
  const userColRef = db.collection("users");
  const followDocRef = userColRef
    .doc(currentUser.uid)
    .collection("following")
    .doc(followUserId);
  const followedDocRef = userColRef
    .doc(followUserId)
    .collection("followers")
    .doc(currentUser.uid);
  const batch = db.batch();

  batch.set(followDocRef, {
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  batch.set(followedDocRef, {
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  await batch.commit();
};
