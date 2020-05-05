import { AppUser } from "types/AppUser";
import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "context";

export const useFollows = (uid: string) => {
  const [follows, setFollows] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);
  console.log(uid);
  useEffect(() => {
    if (!db) throw new Error("Firestore is not initialized");
    const followsQuery = db
      .collection("users")
      .doc(uid)
      .collection("follows")
      .orderBy("createdAt", "desc")
      .limit(8);

    const load = async () => {
      setLoading(true);
      try {
        const followsSnap = await followsQuery.get();
        console.log(followsSnap);
        const followsData: AppUser[] = await Promise.all(
          followsSnap.docs.map(async (doc) => {
            // doc のIDがフォロー対象のID
            console.log(doc.id);
            const userDoc = await db.collection("users").doc(doc.id).get();
            const userData = userDoc.data() as AppUser;

            return {
              uid: doc.id,
              displayName: userData.displayName,
              photoURL: userData.photoURL,
            };
          })
        );
        console.log(`follows: ${followsData}`);
        setFollows(followsData);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };

    load();
  }, [db, uid]);

  return { follows, loading, error };
};
