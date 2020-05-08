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
};
export type fsVideo = Video & {
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};
