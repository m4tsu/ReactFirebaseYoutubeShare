import { useMemo, useCallback, useContext, useState, useEffect } from "react";
// import { db } from "FirebaseConfig";
import { Video } from "types/Video";
import { AppUser } from "types/AppUser";
import { firestore, User } from "firebase";
import { FirebaseContext, AuthContext } from "context";

export const useVideos = (uid: string) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const query = db
      .collection("users")
      .doc(uid)
      .collection("videos")
      .orderBy("createdAt", "desc");

    const load = async () => {
      setLoading(true);
      try {
        const snap = await query.get();
        const videosData = snap.docs.map((doc) => ({
          ...(doc.data() as Video),
          id: doc.id,
        }));
        setVideos(videosData);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    load();
  }, [db, uid]);

  return { videos, loading, error };
};

export const useAddVideo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);
  const { currentUser } = useContext(AuthContext);
  const videosRef = useMemo(() => {
    if (!currentUser) return null;

    return db.collection("users").doc(currentUser.uid).collection("videos");
  }, [db, currentUser]);

  const addVideo = useCallback(
    async (newVideo: Video) => {
      setLoading(true);
      try {
        if (!videosRef) return null;
        const docRef = await videosRef.add({
          ...newVideo,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log(docRef);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    },
    [videosRef]
  );

  return { addVideo, loading, error };
};
