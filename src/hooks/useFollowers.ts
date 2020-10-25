import { AppUser } from "types/AppUser";
import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "context";
import { ErrorContext } from "components/Pages/Error/ErrorProvider";

export const useFollowers = (uid: string) => {
  const [followers, setFollowers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { db } = useContext(FirebaseContext);
  const { setContextError } = useContext(ErrorContext);

  useEffect(() => {
    const followersQuery = db
      .collection("users")
      .doc(uid)
      .collection("followers")
      .orderBy("createdAt", "desc")
      .limit(8);

    const load = async () => {
      setLoading(true);
      try {
        const followersSnap = await followersQuery.get();
        const followersData = await Promise.all(
          followersSnap.docs.map(async (doc) => {
            const userDoc = await db.collection("users").doc(doc.id).get();
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
      } catch (err) {
        setContextError(err);
      }
    };

    load();
  }, [db, uid, setContextError]);

  return { followers, loading };
};
