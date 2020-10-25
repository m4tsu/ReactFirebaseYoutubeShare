import { useContext, useState, useEffect } from "react";
import { Video } from "types/Video";
import { FirebaseContext } from "context";

type UseVideoArg = {
  uid: string;
  id: string;
};

export const useVideo = ({ uid, id }: UseVideoArg) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const query = db.collection("users").doc(uid).collection("videos").doc(id);

    return query.onSnapshot({ includeMetadataChanges: true }, (doc) => {
      if (doc.exists) {
        const data = doc.data() as Video;
        const videoData = {
          ...data,
          comment: data.comment.replace(/\\n/g, "\n"),
          id: doc.id,
        };
        if (!doc.metadata.hasPendingWrites) {
          setVideo(videoData);
          setError(null);
        }
      }
      setLoading(false);
    });
  }, [db, uid, id]);

  return { video, loading, error };
};
