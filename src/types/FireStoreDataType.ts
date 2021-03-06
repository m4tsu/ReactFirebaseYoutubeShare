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
    likeCount: number;
    likeVideos: LikeVideosRef[];
  };
};

export type LikeVideosRef = {
  videoRef: firebase.firestore.DocumentReference; // video docRef
  createdAt: firebase.firestore.Timestamp; // Videoはクライアントジョインする
};

type Video = {
  id: {
    videoId: string; // Youtube videoのID
    type: "video" | "playlist" | "nicovideo";
    comment: string;
    user: firebase.firestore.DocumentReference;
    likedCount: number;
    likedUsers: {
      uid: {
        uid: string;
        displayName: string;
        photoURL: string;
      };
    }[];
    createdAt: firebase.firestore.Timestamp;
    updatedAt: firebase.firestore.Timestamp;
  };
};

type Timeline = {
  // timelineに追加するVideoの docID と同一
  id: {
    videoId: string; // Youtube videoのID
    type: "video" | "playlist" | "nicovideo";
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

type FirebaseUsers = FirebaseUser[];
