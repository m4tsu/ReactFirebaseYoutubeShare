import React, { FC, useEffect, useContext, useState, useCallback } from "react";
import { AppUser } from "types/AppUser";
import { Message } from "semantic-ui-react";
import { Loading } from "components/Common/Loading";
import { SideMenuContext } from "context";
import { useFetchTimeLine } from "hooks/useFetchTimeLine";
import { ScrollVideos } from "./ScrollVideos";

type TimeLineProps = {
  currentUser: AppUser;
};

const maxVideosNumber = 30;

export const TimeLine: FC<TimeLineProps> = ({ currentUser }) => {
  const {
    timeline,
    loading,
    fetchMore,
    allFetched,
    loadingMore,
  } = useFetchTimeLine(currentUser.uid);
  const { setMenuLocation } = useContext(SideMenuContext);
  const [fetchLimited, setFetchLimited] = useState(false);

  useEffect(() => {
    setMenuLocation("home");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  useEffect(() => {
    if (timeline.length >= maxVideosNumber) {
      setFetchLimited(true);
    }
  }, [timeline]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (loadingMore || fetchLimited) return;
      const element = e.target;
      const threshold = 10;
      const { scrollHeight, scrollTop, clientHeight } = element as any;
      if (!allFetched && scrollHeight - scrollTop - threshold < clientHeight) {
        fetchMore();
      }
    },
    [allFetched, fetchLimited, fetchMore, loadingMore]
  );

  if (loading) {
    return <Loading />;
  }

  if (timeline.length === 0) {
    return <Message>フォロー中のユーザーの新規登録動画がありません</Message>;
  }

  return (
    <ScrollVideos
      videos={timeline}
      handleScroll={handleScroll}
      loadingMore={loadingMore}
    />
  );
};
