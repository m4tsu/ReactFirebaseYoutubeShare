import { useContext, useCallback } from "react";
import { firebase } from "FirebaseConfig";
import { FirebaseContext, FirebaseContextValue } from "context";

const provider = new firebase.auth.TwitterAuthProvider();

export const useAuth = () => {
  const { auth }: FirebaseContextValue = useContext(FirebaseContext);
  const signin = useCallback(() => {
    auth.signInWithRedirect(provider);
  }, [auth]);

  const signout = useCallback(() => {
    auth.signOut();
  }, [auth]);

  return { signin, signout };
};
