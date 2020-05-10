import React, { FC } from "react";
import { AppUser } from "types/AppUser";
import { Segment, Grid, Image } from "semantic-ui-react";
import styled from "styled-components";
import moment from "moment";
import { Loading } from "components/Common/Loading";
import { Link } from "react-router-dom";
import { VideoCardComment } from "components/Common/Comment";
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

type TimeLineProps = {
  currentUser: AppUser;
};

export const TimeLine: FC<TimeLineProps> = ({ currentUser }) => {
  const { timeline, loading, fetchMore } = useFetchTimeLine(currentUser.uid);

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
    return <p>フォロー中のユーザーの更新がありません</p>;
  }

  return (
    <div onScroll={handleScroll} style={{ height: "85vh", overflow: "auto" }}>
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
                      {moment(timelineVideo.updatedAt.toDate()).format(
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
    </div>
  );
};
