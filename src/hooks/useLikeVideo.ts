import { useState, useContext, useEffect } from "react";
import { AuthContext } from "context";
import { AppUser } from "types/AppUser";

type Arg = {
  db: firebase.firestore.Firestore;
  currentUser: AppUser;
  videoDocId: string;
};

export const useLikeVideo = ({ db, currentUser, videoDocId }: Arg) => {
  const [videoLiked, setVideoLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
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
    };

    load();
  }, [db, currentUser, videoDocId]);

  return { videoLiked, likeLoading, setVideoLiked };
};
