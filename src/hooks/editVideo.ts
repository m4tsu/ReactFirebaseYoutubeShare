import { firebase } from "FirebaseConfig";
import { Video } from "types/Video";

type Arg = {
  uid: string;
  video: Video;
  db: firebase.firestore.Firestore;
  comment: string;
  title: string;
  tags: string[];
};

export const editVideo = async ({
  db,
  uid,
  video,
  comment,
  title,
  tags,
}: Arg) => {
  const batch = db.batch();
  const tagsCol = db.collection("users").doc(uid).collection("tags");
  const videoRef = db
    .collection("users")
    .doc(uid)
    .collection("videos")
    .doc(video.id);
  try {
    batch.set(
      videoRef,
      {
        comment,
        title,
        tags: Array.from(new Set(tags)), // 重複消す
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    tags.forEach((tag: string) => {
      const tagDoc = tagsCol.doc(tag);
      batch.set(tagDoc, {
        label: tag,
      });
    });
    batch.commit();
  } catch (err) {
    console.log(err);

    return null;
  }
};
