import { firebase } from "FirebaseConfig";
import { AppUser } from "types/AppUser";

type Arg = {
  currentUser: AppUser;
  db: firebase.firestore.Firestore;
  tag: string;
};

export const deleteTag = async ({ currentUser, db, tag }: Arg) => {
  const tagDoc = db
    .collection("users")
    .doc(currentUser.uid)
    .collection("tags")
    .doc(tag);
  try {
    await tagDoc.delete();
  } catch (err) {
    console.log(err);
  }
};
