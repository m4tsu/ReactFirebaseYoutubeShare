import React, { FC, useEffect, useContext } from "react";
import { AppUser } from "types/AppUser";
import { Segment, Grid, Image, Message } from "semantic-ui-react";
import styled from "styled-components";
import moment from "moment";
import { Loading } from "components/Common/Loading";
import { Link } from "react-router-dom";
import { VideoCardComment } from "components/Common/Comment";
import { SideMenuContext } from "context";
import { useFetchTimeLine } from "./useFetchTimeLine";
import { VideoView } from "../VideoView";

const CenteredSegment = styled(Segment)`
  max-width: 600px;
  margin: 1em auto !important;
  transition-duration: 0.3s;
  img {
    margin: 1em auto;
  }
  p {
    text-align: center;
  }
  :hover {
    box-shadow: 0 2px 8px #bbb;
  }
`;

const TimelineWrapper = styled.div`
  height: 84vh;
  overflow: auto;
`;

type TimeLineProps = {
  currentUser: AppUser;
};

export const TimeLine: FC<TimeLineProps> = ({ currentUser }) => {
  const { timeline, loading, fetchMore } = useFetchTimeLine(currentUser.uid);
  const { setMenuLocation } = useContext(SideMenuContext);

  useEffect(() => {
    setMenuLocation("home");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  const handleScroll = async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.target;
    const threshold = 10;
    const { scrollHeight, scrollTop, clientHeight } = element as any;

    if (scrollHeight - scrollTop - threshold < clientHeight) {
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
          <CenteredSegment key={timelineVideo.id}>
            <Link to={`/${timelineVideo.user.uid}/videos/${timelineVideo.id}`}>
              <Grid centered divided>
                <Grid.Column width={3}>
                  <Image circular src={timelineVideo.user.photoURL} />
                  <p>{timelineVideo.user.displayName}</p>
                </Grid.Column>
                <Grid.Column width={13}>
                  <VideoView
                    videoId={timelineVideo.videoId}
                    videoType={timelineVideo.type}
                  />
                  <VideoCardComment>
                    <p>{timelineVideo.comment}</p>
                    <span>
                      {moment(timelineVideo.createdAt.toDate()).format(
                        "YYYY年MM月DD日"
                      )}
                    </span>
                  </VideoCardComment>
                </Grid.Column>
              </Grid>
            </Link>
          </CenteredSegment>
        );
      })}
    </TimelineWrapper>
  );
};
