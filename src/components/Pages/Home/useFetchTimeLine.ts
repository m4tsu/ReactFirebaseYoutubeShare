import { useState, useCallback, useEffect, useContext } from "react";
import { FirebaseContext } from "context";
import { useFollows } from "utils/useFollows";

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
  const { db } = useContext(FirebaseContext);
  console.log(timeline);

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
        console.log(timelineData);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    load();
  }, [db, uid]);

  const fetchMore = useCallback(async () => {
    const TimelineCol = db.collection("users").doc(uid).collection("timeline");
    console.log("fetch More");
    try {
      console.log(lastTimelineDoc);
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
      console.log(timelineData);
      if (timelineSnap.docs.length !== 0) {
        setLastTimelineDoc(timelineSnap.docs[timelineSnap.docs.length - 1]);
      } else {
        setLastTimelineDoc(null);
      }

      setTimeline((prevTimeline) => prevTimeline.concat(timelineData));

      return timelineData;
    } catch (err) {
      console.log(err);

      return null;
    }
  }, [db, lastTimelineDoc, uid]);

  return { timeline, loading, fetchMore };
};
