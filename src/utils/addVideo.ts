import { AppUser } from "types/AppUser";
import { NewVideo } from "types/Video";
import { firebase } from "FirebaseConfig";

type Arg = NewVideo & {
  db: firebase.firestore.Firestore;
  currentUser: AppUser;
};

export const addVideo = async ({
  db,
  currentUser,
  videoId,
  type,
  comment,
  tags,
}: Arg) => {
  const batch = db.batch();
  const videoRef = db
    .collection("users")
    .doc(currentUser.uid)
    .collection("videos")
    .doc();
  const tagsCol = db
    .collection("users")
    .doc(currentUser.uid)
    .collection("tags");
  try {
    batch.set(videoRef, {
      user: db.collection("users").doc(currentUser.uid),
      videoId,
      type,
      comment,
      tags: tags.filter((x, i, self) => self.indexOf(x) === i), // 重複消す
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    tags.forEach((tag: string) => {
      const tagDoc = tagsCol.doc(tag);
      batch.set(tagDoc, {
        label: tag,
      });
    });
    await batch.commit();
    console.log("Video created");
  } catch (err) {
    console.log(err);
  }

  // return vi;
};
