import { useContext, useState, useEffect } from "react";
import { Video } from "types/Video";
import { FirebaseContext } from "context";
import { AppUser } from "types/AppUser";
import { ErrorContext } from "components/Pages/Error/ErrorProvider";

type Arg = {
  user: AppUser;
  filterTag: string;
};

export const useVideos = ({ user, filterTag }: Arg) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);
  const { setContextError } = useContext(ErrorContext);

  useEffect(() => {
    let query: firebase.firestore.Query<firebase.firestore.DocumentData>;
    if (filterTag) {
      query = db
        .collection("users")
        .doc(user.uid)
        .collection("videos")
        .where("tags", "array-contains", filterTag)
        .orderBy("updatedAt", "desc");
    } else {
      query = db
        .collection("users")
        .doc(user.uid)
        .collection("videos")
        .orderBy("updatedAt", "desc")
        .limit(40);
    }
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
        setContextError(err);
      }
      setLoading(false);
    };
    load();
  }, [db, user, filterTag, setContextError]);

  return { videos, loading, error };
};
