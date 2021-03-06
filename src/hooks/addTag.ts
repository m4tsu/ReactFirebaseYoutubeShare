type Arg = {
  uid: string;
  db: firebase.firestore.Firestore;
  tagLabel: string;
};

export const addTag = async ({ uid, db, tagLabel }: Arg) => {
  const tagsCol = db.collection("users").doc(uid).collection("tags");
  try {
    await tagsCol.doc(tagLabel).set({ label: tagLabel });
  } catch (err) {
    console.log(err);
  }
};
