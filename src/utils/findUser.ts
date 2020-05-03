import firebase, { User } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { AppUser } from "types/AppUser";

type Arg = {
  db: firebase.firestore.Firestore;
  uid: string;
};

export const findUser = async ({ db, uid }: Arg) => {
  console.log("findUser");
  const UserRef = db.collection("users").doc(uid);
  let appUser: AppUser | null = null;
  const doc = await UserRef.get();

  if (doc.exists) {
    // const user = doc.data() as AppUser;
    const { displayName, photoURL } = doc.data() as AppUser;
    // const user: AppUser = {
    //   uid,
    //   displayName,
    //   photoURL,
    // };
    appUser = { uid, displayName, photoURL };
    console.log(appUser);
  }

  return appUser;
};
