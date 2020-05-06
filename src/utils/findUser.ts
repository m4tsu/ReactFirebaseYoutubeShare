import { AppUser } from "types/AppUser";

type Arg = {
  db: firebase.firestore.Firestore;
  uid: string;
};

export const findUser = async ({ db, uid }: Arg) => {
  const UserRef = db.collection("users").doc(uid);
  let appUser: AppUser | null = null;
  const doc = await UserRef.get();

  if (doc.exists) {
    const { displayName, photoURL } = doc.data() as AppUser;
    appUser = { uid, displayName, photoURL };
  }

  return appUser;
};
