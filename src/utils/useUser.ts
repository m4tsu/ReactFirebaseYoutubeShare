import { useMemo, useCallback, useContext, useState, useEffect } from "react";
import { firestore, User } from "firebase";
import { AppUser } from "types/AppUser";
import { FirebaseContext, AuthContext } from "context";

export const useUser = (uid: string) => {
  const [user, setUser] = useState<AppUser | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const query = db.collection("users").doc(uid);

    const load = async () => {
      setLoading(true);
      let userData: AppUser | null = null;
      try {
        const doc = await query.get();
        if (doc.exists) {
          userData = {
            ...(doc.data() as AppUser),
          };
          setUser(userData);
        }
        // setLoading(false);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    load();
  }, [db, uid]);

  return { user, loading, error };
};
