import { useState, useCallback, useEffect, useContext } from "react";
import { FirebaseContext } from "context";
import { Video } from "types/Video";
import { ErrorContext } from "components/Pages/Error/ErrorProvider";

export const useRecentVideos = () => {
  const [recentVideos, setRecentVideoes] = useState<Video[]>([]);
  const [
    lastVideoDoc,
    setLastVideoDoc,
  ] = useState<null | firebase.firestore.QueryDocumentSnapshot>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allFetched, setAllFetched] = useState(false);
  const { db } = useContext(FirebaseContext);
  const { setContextError } = useContext(ErrorContext);

  useEffect(() => {
    const recentVideosCol = db
      .collectionGroup("videos")
      .orderBy("updatedAt", "desc");

    const load = async () => {
      setLoading(true);
      try {
        const videosSnap = await recentVideosCol.limit(4).get();
        const videosData = videosSnap.docs.map((doc) => {
          const videoData = doc.data() as Video;

          return {
            id: doc.id,
            ...videoData,
          };
        });
        setLastVideoDoc(videosSnap.docs[videosSnap.docs.length - 1]);
        setRecentVideoes(videosData);
      } catch (err) {
        setContextError(err);
      }
      setLoading(false);
    };
    load();
  }, [db, setContextError]);

  const fetchMore = useCallback(async () => {
    const recentVideosCol = db
      .collectionGroup("videos")
      .orderBy("updatedAt", "desc");
    setLoadingMore(true);
    try {
      if (!lastVideoDoc) {
        return null;
      }
      const videosSnap = await recentVideosCol
        .startAfter(lastVideoDoc)
        .limit(4)
        .get();
      const videosData = videosSnap.docs.map((doc) => {
        const videoData = doc.data() as Video;

        return {
          id: doc.id,
          ...videoData,
        };
      });
      if (videosSnap.docs.length === 4) {
        setLastVideoDoc(videosSnap.docs[videosSnap.docs.length - 1]);
      } else {
        setLastVideoDoc(null);
        setAllFetched(true);
      }

      setRecentVideoes((prevVideos) => prevVideos.concat(videosData));
      setLoadingMore(false);

      return videosData;
    } catch (err) {
      setContextError(err);
      setLoadingMore(false);

      return null;
    }
  }, [db, lastVideoDoc, setContextError]);

  return { recentVideos, loading, fetchMore, allFetched, loadingMore };
};
