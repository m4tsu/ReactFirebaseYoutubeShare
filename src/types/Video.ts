import { firestore } from "firebase";

export type VideoType = "video" | "playlist";

export type NewVideo = {
  videoId: string;
  type: VideoType;
  comment: string;
  userId?: string;
};

export type Video = {
  id: string;
  videoId: string;
  type: VideoType;
  comment: string;
  userId?: string;
};
export type fsVideo = Video & {
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};
