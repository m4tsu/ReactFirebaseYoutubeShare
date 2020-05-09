export type FirebaseUser = {
  id: {
    // uid と同一にする
    uid: string;
    displayName: string;
    screenName: string;
    photoURL: string;
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
    videos: Video[];
    following: Follow[];
    followers: Follower[];
    timeline: Timeline[];
  };
};

type Video = {
  id: {
    videoId: string; // Youtube videoのID
    type: "video" | "playlist";
    comment: string;
    user: firebase.firestore.DocumentReference;
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  };
};

type Timeline = {
  // timelineに追加するVideoの docID と同一
  id: {
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
};

type Follow = {
  // フォローした相手のUserのuid
  id: {
    createdAt: firebase.firestore.Timestamp;
  };
};

type Follower = {
  // フォローされた相手のUserのuid
  id: {
    createdAt: firebase.firestore.Timestamp;
  };
};

type Users = User[];
