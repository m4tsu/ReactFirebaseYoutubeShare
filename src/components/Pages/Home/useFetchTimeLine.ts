import { useState, useCallback, useEffect, useContext } from "react";
import { FirebaseContext } from "context";

type TimelineVideo = {
  id: string; // Video doc ID
  videoId: string; // Youtube videoのID
  type: "video" | "playlist";
  comment: string;
  // もとのVideoのタイムスタンプ
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
};

export const useFetchTimeLine = (uid: string) => {
  const [timeline, setTimeline] = useState<TimelineVideo[]>([]);
  const [
    lastTimelineDoc,
    setLastTimelineDoc,
  ] = useState<null | firebase.firestore.QueryDocumentSnapshot>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allFetched, setAllFetched] = useState(false);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const TimelineCol = db.collection("users").doc(uid).collection("timeline");

    const load = async () => {
      setLoading(true);
      try {
        const timelineSnap = await TimelineCol.orderBy("updatedAt", "desc")
          .limit(4)
          .get();
        const timelineData = await Promise.all(
          timelineSnap.docs.map(async (doc) => {
            return {
              id: doc.id,
              ...(doc.data() as TimelineVideo),
            };
          })
        );
        setLastTimelineDoc(timelineSnap.docs[timelineSnap.docs.length - 1]);
        setTimeline(timelineData);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    load();
  }, [db, uid]);

  const fetchMore = useCallback(async () => {
    const TimelineCol = db.collection("users").doc(uid).collection("timeline");
    setLoadingMore(true);
    try {
      if (!lastTimelineDoc) {
        return null;
      }
      const timelineSnap = await TimelineCol.orderBy("updatedAt", "desc")
        .startAfter(lastTimelineDoc)
        .limit(4)
        .get();
      const timelineData = await Promise.all(
        timelineSnap.docs.map(async (doc) => {
          return {
            id: doc.id,
            ...(doc.data() as TimelineVideo),
          };
        })
      );
      if (timelineSnap.docs.length === 4) {
        setLastTimelineDoc(timelineSnap.docs[timelineSnap.docs.length - 1]);
      } else {
        setLastTimelineDoc(null);
        setAllFetched(true);
      }

      setTimeline((prevTimeline) => prevTimeline.concat(timelineData));
      setLoadingMore(false);

      return timelineData;
    } catch (err) {
      console.log(err);
      setLoadingMore(false);

      return null;
    }
  }, [db, lastTimelineDoc, uid]);

  return { timeline, loading, fetchMore, allFetched, loadingMore };
};
