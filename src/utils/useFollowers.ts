import { AppUser } from "types/AppUser";
import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "context";

export const useFollowers = (uid: string) => {
  const [followers, setFollowers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);
  console.log(uid);
  useEffect(() => {
    const followersQuery = db
      .collectionGroup("follows")
      .where("followedId", "==", uid);

    const load = async () => {
      setLoading(true);
      try {
        const followersSnap = await followersQuery.get();
        console.log(followersSnap);
        const followersData = await Promise.all(
          followersSnap.docs.map(async (doc) => {
            console.log(doc.data());
            const userDoc = await db
              .collection("users")
              .doc(doc.data().uid)
              .get();
            console.log(userDoc);
            const userData = userDoc.data() as AppUser;

            return {
              uid: userDoc.id,
              displayName: userData.displayName,
              photoURL: userData.photoURL,
            };
          })
        );
        console.log(`followers: ${followersData}`);
        setFollowers(followersData);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };

    load();
  }, [db, uid]);

  return { followers, loading, error };
};
