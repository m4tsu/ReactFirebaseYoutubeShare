import { useContext, useState, useEffect } from "react";
import { AppUser } from "types/AppUser";
import { FirebaseContext } from "context";
import { ErrorContext } from "components/Pages/Error/ErrorProvider";

export const useUser = (uid: string) => {
  const [user, setUser] = useState<AppUser | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const { db } = useContext(FirebaseContext);
  const { setContextError } = useContext(ErrorContext);

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
      } catch (err) {
        setContextError(err);
      }
      setLoading(false);
    };
    load();
  }, [db, uid, setContextError]);

  return { user, loading };
};
