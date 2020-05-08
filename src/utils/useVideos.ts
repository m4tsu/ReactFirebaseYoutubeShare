import { useContext, useState, useEffect } from "react";
import { Video } from "types/Video";
import { FirebaseContext } from "context";

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
