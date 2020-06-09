import { useContext, useState, useEffect } from "react";
import { Video } from "types/Video";
import { FirebaseContext } from "context";
import { AppUser } from "types/AppUser";

type Arg = {
  videoDocId: string;
  uid: string;
};

export const useLikedUsers = ({ videoDocId, uid }: Arg) => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const load = async () => {
      setLoading(false);
      try {
        const likedUsersRefSnap = await db
          .collection("users")
          .doc(uid)
          .collection("videos")
          .doc(videoDocId)
          .collection("likedUsers")
          .get();

        const usersData = await Promise.all(
          likedUsersRefSnap.docs.map(async (doc) => {
            const user = await db.doc(doc.data().userRef.path).get();

            return user.data() as AppUser;
          })
        );
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, [db, videoDocId, uid]);

  return { users, loading };
};
