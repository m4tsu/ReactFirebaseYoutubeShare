import { firebase } from "FirebaseConfig";

export type VideoType = "video" | "playlist";

export type NewVideo = {
  videoId: string;
  type: VideoType;
  comment: string;
  userId?: string;
};

export type Video = {
  id: string; // FireStore doc Id
  videoId: string;
  type: VideoType;
  comment: string;
  userId?: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
};
export type fsVideo = Video & {
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export type TimelineVideo = {
  videoId: string; // Youtube videoのID
  type: "video" | "playlist";
  comment: string;
  // もとのVideoのタイムスタンプ
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
  user: {
    displayName: string;
    photoURL: string;
  };
};
