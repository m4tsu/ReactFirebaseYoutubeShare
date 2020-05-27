import React, { FC, useEffect, useContext, useState } from "react";
import { AppUser } from "types/AppUser";
import { Segment, Grid, Image, Message, Loader } from "semantic-ui-react";
import styled from "styled-components";
import moment from "moment";
import { Loading } from "components/Common/Loading";
import { Link } from "react-router-dom";
import { VideoCardComment } from "components/Common/Comment";
import { SideMenuContext } from "context";
import { useFetchTimeLine } from "./useFetchTimeLine";
import { VideoView } from "../VideoView";
import { TimelineCard } from "./TimelineCard";

// const CenteredSegment = styled(Segment)`
//   max-width: 600px;
//   margin: 1em auto !important;
//   transition-duration: 0.3s;
//   img {
//     margin: 1em auto;
//   }
//   p {
//     text-align: center;
//   }
//   :hover {
//     box-shadow: 0 2px 8px #bbb;
//   }
// `;

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
          <TimelineCard
            currentUser={currentUser}
            video={timelineVideo}
            key={timelineVideo.id}
          />
        );
      })}
      <LoadingContainer>
        {loadingMore && <Loader active inline="centered" />}
      </LoadingContainer>
    </TimelineWrapper>
  );
};
