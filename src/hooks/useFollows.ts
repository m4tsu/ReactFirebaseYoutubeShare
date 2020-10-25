import { AppUser } from "types/AppUser";
import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "context";
import { ErrorContext } from "components/Pages/Error/ErrorProvider";

export const useFollows = (uid: string) => {
  const [follows, setFollows] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(false);
  const { db } = useContext(FirebaseContext);
  const { setContextError } = useContext(ErrorContext);

  useEffect(() => {
    const followsQuery = db
      .collection("users")
      .doc(uid)
      .collection("following")
      .orderBy("createdAt", "desc")
      .limit(8);

    const load = async () => {
      setLoading(true);
      try {
        const followsSnap = await followsQuery.get();
        const followsData: AppUser[] = await Promise.all(
          followsSnap.docs.map(async (doc) => {
            // doc のIDがフォロー対象のID
            const userDoc = await db.collection("users").doc(doc.id).get();
            const userData = userDoc.data() as AppUser;

            return {
              uid: doc.id,
              displayName: userData.displayName,
              photoURL: userData.photoURL,
              screenName: userData.screenName,
            };
          })
        );
        setFollows(followsData);
        setLoading(false);
      } catch (err) {
        setContextError(err);
      }
    };

    load();
  }, [db, uid, setContextError]);

  return { follows, loading };
};
