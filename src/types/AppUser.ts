import { firebase } from "FirebaseConfig";

export type AppUser = {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  screenName: string | null;
  likeCount?: number;
};

export type fsAppUser = AppUser & {
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};
