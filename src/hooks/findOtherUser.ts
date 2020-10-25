import { AppUser } from "types/AppUser";

type Arg = {
  db: firebase.firestore.Firestore;
  screenName: string;
};

export const findOtherUser = async ({ screenName, db }: Arg) => {
  const query = db
    .collection("users")
    .orderBy("screenName")
    .startAt(screenName)
    .endAt(`${screenName}\uf8ff`);

  try {
    const users = await query.get();
    const usersData = users.docs.map((doc) => {
      const data = doc.data() as AppUser;

      return data;
    });

    return usersData;
  } catch (err) {
    console.log(err);

    return [];
  }
};
