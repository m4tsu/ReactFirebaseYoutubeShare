import { createContext } from "react";
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

export type SideMenuLocation =
  | "home"
  | "videos"
  | "following"
  | "followers"
  | "other";

type SideMenuContextValue = {
  menuLocation: SideMenuLocation;
  setMenuLocation: React.Dispatch<React.SetStateAction<SideMenuLocation>>;
};

export const SideMenuContext = createContext<SideMenuContextValue>({
  menuLocation: "other",
  setMenuLocation: () => undefined,
});
