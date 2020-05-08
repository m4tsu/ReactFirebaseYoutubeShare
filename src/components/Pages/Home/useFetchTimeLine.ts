import { useState, useCallback, useEffect, useContext } from "react";
import { FirebaseContext } from "context";
import { useFollows } from "utils/useFollows";

export const useFetchTimeLine = (uid: string) => {
  const [tlVideos, setTlVideos] = useState([]);
  const [currentPageDocs, setCurrentPageDocs] = useState(null);
  const db = useContext(FirebaseContext);
  const { follows, loading: followsLoading } = useFollows(uid);

  // useEffect(async()=> {
  //   const videos = await
  // })

  // const getTlVideos = useCallback(async()=> {

  // })
};
