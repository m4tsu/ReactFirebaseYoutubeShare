import { firebase } from "FirebaseConfig";

export type AppUser = {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
};

export type fsAppUser = AppUser & {
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};
