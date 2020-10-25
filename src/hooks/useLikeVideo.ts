import { useState, useContext, useEffect } from "react";
import { AppUser } from "types/AppUser";
import { ErrorContext } from "components/Pages/Error/ErrorProvider";

type Arg = {
  db: firebase.firestore.Firestore;
  currentUser: AppUser;
  videoDocId: string;
};

export const useLikeVideo = ({ db, currentUser, videoDocId }: Arg) => {
  const [videoLiked, setVideoLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const { setContextError } = useContext(ErrorContext);

  useEffect(() => {
    const load = async () => {
      try {
        setLikeLoading(true);
        const likeVideos = db
          .collection("users")
          .doc(currentUser.uid)
          .collection("likeVideos");

        const likeDoc = await likeVideos.doc(videoDocId).get();
        if (likeDoc.exists) {
          setVideoLiked(true);
        }
        setLikeLoading(false);
      } catch (err) {
        setContextError(err);
      }
    };

    load();
  }, [db, currentUser, videoDocId, setContextError]);

  return { videoLiked, likeLoading, setVideoLiked };
};
