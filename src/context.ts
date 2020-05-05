import { createContext } from "react";
// import firebase from "FirebaseConfig";
import firebase from "firebase/app";
import { AppUser } from "types/AppUser";

export type FirebaseContextValue = {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
};

export const FirebaseContext = createContext(
  (null as unknown) as FirebaseContextValue
);

type authContextValue = {
  currentUser: null | AppUser;
  credential: firebase.auth.UserCredential | null;
  setCredential: (credential: firebase.auth.UserCredential | null) => void;
  loading: boolean;
};

export const AuthContext = createContext<authContextValue>({
  currentUser: null,
  credential: null,
  setCredential: () => undefined,
  loading: true,
});

type SideMenuContextValue = {
  menuLocation: "videos" | "following" | "followers" | "other";
  setMenuLocation: React.Dispatch<
    React.SetStateAction<"videos" | "following" | "followers" | "other">
  >;
};

export const SideMenuContext = createContext<SideMenuContextValue>({
  menuLocation: "other",
  setMenuLocation: () => undefined,
});
