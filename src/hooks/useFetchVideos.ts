import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "context";
import { Video } from "types/Video";

export const useFetchVideos = ({ uid }: { uid: string }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const { db } = useContext(FirebaseContext);
  useEffect(() => {
    const videosCol = db
      .collection("users")
      .doc(uid)
      .collection("videos")
      .orderBy("updatedAt", "desc");
    const unsubscribe = videosCol.onSnapshot((snapshot) => {
      const data: Video[] = [];
      snapshot.forEach((doc) => {
        data.push({ ...(doc.data() as Video), id: doc.id });
      });
      setVideos(data);
      setVideosLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [db, uid]);

  return { videos, videosLoading };
};
