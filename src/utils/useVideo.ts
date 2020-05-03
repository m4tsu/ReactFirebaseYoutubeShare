import { useMemo, useCallback, useContext, useState, useEffect } from "react";
// import { db } from "FirebaseConfig";
import { Video } from "types/Video";
import { AppUser } from "types/AppUser";
import { firestore, User } from "firebase";
import { FirebaseContext, AuthContext } from "context";

type UseVideoArg = {
  uid: string;
  id: string;
};

export const useVideo = ({ uid, id }: UseVideoArg) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const query = db.collection("users").doc(uid).collection("videos").doc(id);

    const load = async () => {
      setLoading(true);
      try {
        const doc = await query.get();
        console.log(doc.exists);
        if (doc.exists) {
          const videoData = {
            ...(doc.data() as Video),
            id: doc.id,
          };
          setVideo(videoData);
          setError(null);
        }
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    };
    load();
  }, [db, uid, id]);

  return { video, loading, error };
};
