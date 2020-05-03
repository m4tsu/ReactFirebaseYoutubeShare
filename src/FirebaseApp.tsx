import React, { FC, useState, useEffect, useRef } from "react";
import firebase, { User } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { FirebaseContext, AuthContext } from "context";
import { AppUser } from "types/AppUser";
import { writeUser } from "utils/writeUser";
import { findUser } from "utils/findUser";

export const FirebaseApp: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [
    credential,
    setCredential,
  ] = useState<firebase.auth.UserCredential | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const counterRef = useRef(0);
  const auth = firebase.auth();
  const db = firebase.firestore();

  useEffect(() => {
    if (credential) counterRef.current += 1;

    return auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        if (counterRef.current === 1 && credential) {
          const appUser = await writeUser({ db, firebaseUser, credential });
          setCurrentUser(appUser);
          setLoading(false);
        } else if (!currentUser) {
          const appUser = await findUser({ db, uid: firebaseUser.uid });
          setCurrentUser(appUser);
          setLoading(false);
        } else {
          setCurrentUser(null);
          setLoading(false);
        }
      } else {
        console.log("no firebaseUser");
        setCurrentUser(null);
        setLoading(false);
      }
    });
  }, [credential]);

  return (
    <FirebaseContext.Provider value={{ auth, db }}>
      <AuthContext.Provider
        value={{ currentUser, loading, credential, setCredential }}
      >
        {children}
      </AuthContext.Provider>
    </FirebaseContext.Provider>
  );
};
