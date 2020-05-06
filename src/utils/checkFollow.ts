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
  const followQuery = db
    .collection("users")
    .doc(currentUser.uid)
    .collection("follows")
    .doc(uid);

  const followDoc = await followQuery.get();
  if (followDoc.exists) {
    return true;
  }

  return false;
};
