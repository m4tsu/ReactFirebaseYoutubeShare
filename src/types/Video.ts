import { firebase } from "FirebaseConfig";
import { Tag } from "./Tag";

export type VideoType = "video" | "playlist" | "nicovideo";

export type NewVideo = {
  videoId: string;
  type: VideoType;
  title: string;
  comment: string;
  userId?: string;
  tags: string[];
};

export type Video = {
  id: string; // FireStore doc Id
  videoId: string;
  type: VideoType;
  title: string;
  comment: string;
  user: {
    uid: string;
    photoURL: string;
    displayName: string;
    // id: string;
  };
  tags: string[];
  likeCount: number;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
};
// export type fsVideo = Video & {
//   createdAt: firebase.firestore.Timestamp | null;
//   updatedAt: firebase.firestore.Timestamp | null;
// };

export type TimelineVideo = {
  videoId: string; // Youtube videoのID
  type: VideoType;
  comment: string;
  // もとのVideoのタイムスタンプ
  createdAt?: firebase.firestore.Timestamp;
  updatedAt?: firebase.firestore.Timestamp;
  user: {
    displayName: string;
    photoURL: string;
  };
};
