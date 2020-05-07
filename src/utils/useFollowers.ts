import { AppUser } from "types/AppUser";
import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "context";

export const useFollowers = (uid: string) => {
  const [followers, setFollowers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);
  useEffect(() => {
    const followersQuery = db
      .collectionGroup("follows")
      .where("followedId", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(8);

    const load = async () => {
      setLoading(true);
      try {
        const followersSnap = await followersQuery.get();
        const followersData = await Promise.all(
          followersSnap.docs.map(async (doc) => {
            const userDoc = await db
              .collection("users")
              .doc(doc.data().uid)
              .get();
            const userData = userDoc.data() as AppUser;

            return {
              uid: userDoc.id,
              displayName: userData.displayName,
              photoURL: userData.photoURL,
              screenName: userData.screenName,
            };
          })
        );
        setFollowers(followersData);
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(err);
      }
    };

    load();
  }, [db, uid]);

  return { followers, loading, error };
};
