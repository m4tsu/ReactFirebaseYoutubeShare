import { AppUser } from "types/AppUser";
import { useContext, useState, useEffect, useMemo } from "react";
import { FirebaseContext } from "context";
import { Video } from "types/Video";
import { LikeVideosRef } from "types/FireStoreDataType";

type Arg = {
  user: AppUser;
  activePage: number;
  videoPerPage: number;
};

export const useLikeVideos = ({ user, activePage, videoPerPage }: Arg) => {
  const [likeVideosRef, setLikeVideosRef] = useState<LikeVideosRef[]>([]);
  const [pageVideos, setPageVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const likeVideosRefSnap = await db
          .collection("users")
          .doc(user.uid)
          .collection("likeVideos")
          .orderBy("createdAt", "desc")
          .get();
        setLikeVideosRef(
          await Promise.all(
            likeVideosRefSnap.docs.map((doc) => {
              return {
                ...(doc.data() as LikeVideosRef),
              };
            })
          )
        );
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    load();
  }, [db, user]);

  useEffect(() => {
    const startVideoIndex = (activePage - 1) * videoPerPage;

    const load = async () => {
      if (likeVideosRef.length === 0) return;
      setLoading(true);
      try {
        const videosData = await Promise.all(
          likeVideosRef
            .slice(startVideoIndex, startVideoIndex + videoPerPage)
            .map(async (likeVideoRef) => {
              const likeVideoDoc = await db
                .doc(likeVideoRef.videoRef.path)
                .get();

              return {
                ...(likeVideoDoc.data() as Video),
                // uid: likeVideoRef.uid,
                id: likeVideoDoc.id,
              };
            })
        );
        setPageVideos(videosData);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    load();
  }, [db, activePage, likeVideosRef, videoPerPage]);

  return { pageVideos, loading, totalVideoNumber: likeVideosRef.length };
};
