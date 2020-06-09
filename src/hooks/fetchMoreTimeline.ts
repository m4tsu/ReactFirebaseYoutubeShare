import { AppUser } from "types/AppUser";

type TimelineVideo = {
  id: string; // Video doc ID
  videoId: string; // Youtube videoのID
  type: "video" | "playlist";
  comment: string;
  // もとのVideoのタイムスタンプ
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  user: {
    displayName: string;
    photoURL: string;
  };
};

type Arg = {
  db: firebase.firestore.Firestore;
  currentUser: AppUser;
  lastTimelineDoc: firebase.firestore.QueryDocumentSnapshot;
  // setTimeline: React.Dispatch<React.SetStateAction<TimelineVideo[]>>;
};

export const fetchMoreTimeline = async ({
  db,
  currentUser,
  lastTimelineDoc,
}: // setTimeline,
Arg) => {
  const TimelineCol = db
    .collection("users")
    .doc(currentUser.uid)
    .collection("timeline");

  try {
    const timelineSnap = await TimelineCol.orderBy("updatedAt", "desc")
      .startAfter(lastTimelineDoc)
      .limit(2)
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

    return timelineData;
  } catch (err) {
    console.log(err);

    return null;
  }
};
