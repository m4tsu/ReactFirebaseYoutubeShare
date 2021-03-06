import { useState, useContext, useEffect } from "react";
import { Tag } from "types/Tag";
import { FirebaseContext } from "context";

type Arg = {
  uid: string;
};

export const useFetchTags = ({ uid }: Arg) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const query = db.collection("users").doc(uid).collection("tags");
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
  }, [db, uid]);

  return { tags, tagsLoading };
};
