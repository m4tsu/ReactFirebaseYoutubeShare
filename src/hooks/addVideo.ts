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
  title,
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
      user: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      videoId,
      type,
      title,
      comment,
      likeCount: 0,
      tags: Array.from(new Set(tags)), // 重複消す
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
  } catch (err) {
    console.log(err);
  }
};
