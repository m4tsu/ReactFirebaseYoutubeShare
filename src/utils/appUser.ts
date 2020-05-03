import firebase from "firebase/app";
import { User, firestore } from "firebase";
import { AppUser } from "types/AppUser";

type AppUserArg = {
  db: firebase.firestore.Firestore;
  authUser: User;
  // setCurrentUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
};

export const findOrCreateUser = async ({
  db,
  authUser,
}: // setCurrentUser,
AppUserArg) => {
  const UserRef = db.collection("users").doc(authUser.uid);

  const doc = await UserRef.get();
  const data = doc.data();
  if (data) {
    // TODO: authUser の値との差を確認して変更があればFireStoreのデータを更新させる
    const { uid, displayName, photoURL } = data;
    const user: AppUser = {
      uid,
      displayName,
      photoURL,
    };
    // setCurrentUser(user);
    console.log(user);
  } else {
    const { uid, displayName, photoURL } = authUser as AppUser;
    const newUser: AppUser = {
      uid,
      displayName,
      photoURL,
    };
    UserRef.set({
      ...newUser,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    })
      .then(() => {
        console.log("success create user");
        // setCurrentUser({ uid, displayName, photoURL });
      })
      .catch((error) => {
        console.log(error);
        // setCurrentUser(null);
      });
  }
};
