import { useContext, useCallback } from "react";
import firebase from "firebase/app";
import { FirebaseContext, FirebaseContextValue } from "context";

const provider = new firebase.auth.TwitterAuthProvider();

export const useAuth = () => {
  const { auth }: FirebaseContextValue = useContext(FirebaseContext);
  const signin = useCallback(() => {
    auth.signInWithRedirect(provider);

    console.log("login");
  }, [auth]);

  const signout = useCallback(() => {
    auth.signOut();
    console.log("logout");
  }, [auth]);

  return { signin, signout };
};
