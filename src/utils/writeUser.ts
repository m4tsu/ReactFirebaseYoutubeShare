import { User } from "firebase/app";
import { firebase } from "FirebaseConfig";
import { AppUser } from "types/AppUser";

type Arg = {
  db: firebase.firestore.Firestore;
  firebaseUser: User;
  credential: firebase.auth.UserCredential;
};

type Credential = {
  displayName: string;
  photoURL: string;
};

export const writeUser = async ({ db, firebaseUser, credential }: Arg) => {
  // ツイッターアカウントでログイン時のディスプレイネームとアイコンURL
  const photoURL = (credential.additionalUserInfo?.profile as any)
    .profile_image_url_https;
  const displayName = (credential.additionalUserInfo?.profile as any).name;
  let appUser: AppUser | null = null;
  const batch = db.batch();

  const userDoc = await db.collection("users").doc(firebaseUser.uid).get();
  if (userDoc.exists) {
    const user = userDoc.data() as AppUser;
    const diff: Partial<AppUser> = {};
    if (user.displayName !== displayName) {
      diff.displayName = displayName;
    }
    if (user.photoURL !== photoURL) {
      diff.photoURL = photoURL;
    }
    if (diff.displayName || diff.photoURL) {
      batch.update(userDoc.ref, {
        ...diff,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    appUser = { ...user, ...diff };
  } else {
    const user: AppUser = {
      displayName,
      photoURL,
      uid: firebaseUser.uid,
    };
    batch.set(userDoc.ref, {
      ...user,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    appUser = user;
  }
  await batch.commit();

  return appUser;
};
