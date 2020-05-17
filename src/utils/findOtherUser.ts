import { AppUser } from "types/AppUser";

type Arg = {
  db: firebase.firestore.Firestore;
  displayName: string;
};

export const findOtherUser = async ({ displayName, db }: Arg) => {
  const query = db
    .collection("users")
    .orderBy("displayName")
    .startAt(displayName)
    .endAt(`${displayName}\uf8ff`);

  try {
    const users = await query.get();
    const usersData = users.docs.map((doc) => {
      const data = doc.data() as AppUser;

      return data;
    });

    return usersData;
  } catch (err) {
    return [];
  }
};
