import React, { FC, useEffect, useContext, useState } from "react";
import { AppUser } from "types/AppUser";
import { Message, Loader } from "semantic-ui-react";
import styled from "styled-components";
import { Loading } from "components/Common/Loading";
import { SideMenuContext } from "context";
import { VideoCardWithUser } from "components/Pages/VideoCardWithUser";
import { useFetchTimeLine } from "hooks/useFetchTimeLine";

const TimelineWrapper = styled.div`
  height: 84vh;
  overflow: auto;
  will-change: transform;
  overscroll-behavior: none;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
`;

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

  const handleScroll = async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (loadingMore || fetchLimited) return;
    const element = e.target;
    const threshold = 10;
    const { scrollHeight, scrollTop, clientHeight } = element as any;
    if (!allFetched && scrollHeight - scrollTop - threshold < clientHeight) {
      await fetchMore();
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (timeline.length === 0) {
    return <Message>フォロー中のユーザーの更新がありません</Message>;
  }

  return (
    <TimelineWrapper onScroll={handleScroll}>
      {timeline.map((timelineVideo) => {
        return (
          <VideoCardWithUser
            video={timelineVideo}
            key={timelineVideo.id}
            scroll
          />
        );
      })}
      <LoadingContainer>
        {loadingMore && <Loader active inline="centered" />}
      </LoadingContainer>
    </TimelineWrapper>
  );
};
