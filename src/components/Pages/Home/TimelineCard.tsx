import React, { FC, useContext } from "react";
import { Video } from "types/Video";
import styled from "styled-components";
import moment from "moment";
import { Segment, Grid, Image, Button, Icon } from "semantic-ui-react";
import { VideoCardComment } from "components/Common/Comment";
import { VideoView } from "components/Pages/VideoView";
import { Link } from "react-router-dom";
import { useLikeVideo } from "utils/useLikeVideo";
import { FirebaseContext } from "context";
import { AppUser } from "types/AppUser";
import {
  PaginationVideoCardBody,
  TagButton,
  PaginationVideoCard,
} from "components/Common/PaginationVideoCard";
import { NoMarginImg } from "components/Common/NoMarginImage";
import { likeVideo } from "utils/likeVideo";
import { unlikeVideo } from "utils/unlikeVideo";
import { FavoriteButton } from "components/Common/FavoriteBtn";

const CenteredSegment = styled(Segment)`
  max-width: 540px;
  margin: 1em auto !important;
  transition-duration: 0.3s;
  img {
    margin: 1em auto;
  }
  :hover {
    box-shadow: 0 2px 8px #bbb;
  }
`;

const TimelineCardHeader = styled.div`
  display: flex;
  margin-bottom: 0.5em;
  align-items: baseline;
  a {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600 !important;
  }
  time {
    flex-shrink: 0;
    margin-left: 0.5em;
    margin-right: 0.5em;
  }
`;

const VideoCardBody = styled(PaginationVideoCardBody)`
  height: initial !important;
`;

type TimelineCardProps = {
  currentUser: AppUser;
  video: Video;
};

export const TimelineCard: FC<TimelineCardProps> = ({ currentUser, video }) => {
  const { db } = useContext(FirebaseContext);
  const { videoLiked, likeLoading, setVideoLiked } = useLikeVideo({
    currentUser,
    db,
    videoDocId: video.id,
  });

  const handleClickLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await likeVideo({
      db,
      currentUser,
      likedVideoUserId: video.user.uid,
      videoDocId: video.id,
    });
    setVideoLiked(true);
  };

  const handleClickUnlike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await unlikeVideo({
      db,
      currentUser,
      likedVideoUserId: video.user.uid,
      videoDocId: video.id,
    });
    setVideoLiked(false);
  };

  return (
    <CenteredSegment>
      <Link to={`/${video.user.uid}/videos/${video.id}`}>
        <Grid centered>
          <Grid.Column width={3}>
            <Link to={`/${video.user.uid}/videos`}>
              <NoMarginImg circular src={video.user.photoURL} />
            </Link>
          </Grid.Column>
          <Grid.Column width={13} style={{ paddingLeft: "0" }}>
            <TimelineCardHeader>
              <Link to={`/${video.user.uid}/videos`}>
                {video.user.displayName}
              </Link>
              <time>
                {moment(video.createdAt.toDate()).format("YYYY年MM月DD日")}
              </time>
              <FavoriteButton
                videoLiked={videoLiked}
                likeLoading={likeLoading}
                handleClickLike={handleClickLike}
                handleClickUnlike={handleClickUnlike}
              />
            </TimelineCardHeader>

            <VideoView videoId={video.videoId} videoType={video.type} />
            <VideoCardBody>
              <VideoCardComment>
                <p>{video.comment}</p>
              </VideoCardComment>
            </VideoCardBody>
          </Grid.Column>
        </Grid>
      </Link>
    </CenteredSegment>
  );
};
