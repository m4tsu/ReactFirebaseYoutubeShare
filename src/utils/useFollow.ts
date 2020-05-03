import { useCallback, useContext, useState } from "react";
import { firestore } from "firebase";
import { AppUser } from "types/AppUser";
import { FirebaseContext, AuthContext } from "context";

type Follow = {
  currentUserId: string;
  followedId: string;
};

export const useFollow = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);
  // const { currentUser } = useContext(AuthContext);
  const userRef = db.collection("users");
  const follow = useCallback(
    // followする対象のuid
    async ({ currentUserId, followedId }: Follow) => {
      console.log("follow");
      const followRef = userRef
        .doc(currentUserId)
        .collection("follows")
        .doc(followedId);
      setLoading(true);
      try {
        // if (!followsRef) return null;
        await followRef.set({
          uid: currentUserId,
          followedId,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    },
    [userRef]
  );

  const unfollow = useCallback(
    async ({ currentUserId, followedId }: Follow) => {
      console.log("unfollow");
      const followRef = userRef
        .doc(currentUserId)
        .collection("follows")
        .doc(followedId);
      setLoading(true);
      try {
        await followRef.delete();
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    },
    [userRef]
  );

  return { follow, unfollow, loading, error };
};
