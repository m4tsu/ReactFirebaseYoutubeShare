import { useCallback, useContext, useState, useEffect } from "react";
import { Video, NewVideo } from "types/Video";
import { firebase } from "FirebaseConfig";
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

export const useAddVideo = (uid: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);

  const addVideo = useCallback(
    async (newVideo: NewVideo) => {
      const videoRef = db
        .collection("users")
        .doc(uid)
        .collection("videos")
        .doc(newVideo.videoId);
      setLoading(true);
      try {
        await videoRef.set({
          ...newVideo,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    },
    [db, uid]
  );

  return { addVideo, loading, error };
};
