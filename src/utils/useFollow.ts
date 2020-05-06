import { useCallback, useContext, useState } from "react";
import { firebase } from "FirebaseConfig";
import { FirebaseContext } from "context";

type Follow = {
  currentUserId: string;
  followedId: string;
};

export const useFollow = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);
  const userRef = db.collection("users");
  const follow = useCallback(
    // followする対象のuid
    async ({ currentUserId, followedId }: Follow) => {
      const followRef = userRef
        .doc(currentUserId)
        .collection("follows")
        .doc(followedId);
      setLoading(true);
      try {
        await followRef.set({
          uid: currentUserId,
          followedId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    },
    [userRef]
  );

  const unfollow = useCallback(
    async ({ currentUserId, followedId }: Follow) => {
      const followRef = userRef
        .doc(currentUserId)
        .collection("follows")
        .doc(followedId);
      setLoading(true);
      try {
        await followRef.delete();
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    },
    [userRef]
  );

  return { follow, unfollow, loading, error };
};
