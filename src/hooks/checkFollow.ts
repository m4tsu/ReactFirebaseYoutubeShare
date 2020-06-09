import { AppUser } from "types/AppUser";

type Arg = {
  currentUser: AppUser | null;
  uid: string;
  db: firebase.firestore.Firestore;
};

export const checkFollow = async ({ currentUser, uid, db }: Arg) => {
  if (!currentUser) {
    return false;
  }
  const followRef = db
    .collection("users")
    .doc(currentUser.uid)
    .collection("following")
    .doc(uid);

  const followDoc = await followRef.get();
  if (followDoc.exists) {
    return true;
  }

  return false;
};
