import { useState, useContext, useEffect } from "react";
import { Tag } from "types/Tag";
import { FirebaseContext } from "context";
import { AppUser } from "types/AppUser";

type Arg = {
  user: AppUser | null | undefined;
};

export const useFetchTags = ({ user }: Arg) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    if (!user) {
      return;
    }
    const query = db.collection("users").doc(user.uid).collection("tags");
    const unsubscribe = query.onSnapshot((snapshot) => {
      const tagsData = snapshot.docs.map((doc) => {
        const data = doc.data() as Tag;

        return data;
      });
      setTags(tagsData);
      setTagsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [db, user]);

  return { tags, tagsLoading };
};
