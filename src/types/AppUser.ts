import { firestore } from "firebase";

export type AppUser = {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
};

export type fsAppUser = AppUser & {
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};
