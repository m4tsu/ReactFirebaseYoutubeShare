type Arg = {
  uid: string;
  id: string;
  db: firebase.firestore.Firestore;
  comment: string;
};

export const editVideo = async ({ db, uid, id, comment }: Arg) => {
  const videoRef = db.collection("users").doc(uid).collection("videos").doc(id);
  try {
    await videoRef.set(
      {
        comment,
      },
      { merge: true }
    );
    console.log("edit");
  } catch (err) {
    console.log(err);
  }
};
