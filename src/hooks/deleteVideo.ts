type Arg = {
  uid: string;
  id: string;
  db: firebase.firestore.Firestore;
};

export const deleteVideo = async ({ db, uid, id }: Arg) => {
  const videoRef = db.collection("users").doc(uid).collection("videos").doc(id);
  try {
    await videoRef.delete();
  } catch (err) {
    console.log(err);
  }
};
