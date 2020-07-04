import React, { useContext } from "react";
import { Video } from "types/Video";
import styled from "styled-components";
import moment from "moment";
import { Segment, Grid, Divider } from "semantic-ui-react";
import { VideoCardComment } from "components/Common/Comment";
import { VideoView } from "components/Pages/VideoView";
import { Link } from "react-router-dom";
import { AuthContext } from "context";
import {
  PaginationVideoCardBody,
  TagButton,
} from "components/Common/PaginationVideoCard";
import { NoMarginImg } from "components/Common/NoMarginImage";
import { FavoriteButton } from "components/Common/FavoriteBtn";
import { VideoCardTitle } from "components/Common/VideoTitle";

const VideoCard = styled(Segment)<{ scroll: boolean }>`
  max-width: ${({ size }) => (size === "small" ? "480px" : "540px")};
  margin: 0 auto !important;
  margin-bottom: 1em !important;
  padding-bottom: ${({ scroll }) => (scroll ? "" : "0 !important")};
  transition-duration: 0.3s;
  height: ${({ scroll }) => (scroll ? "" : "100%")};
  img {
    margin: 1em auto;
  }
  :hover {
    box-shadow: 0 2px 8px #bbb;
  }
`;

const VideoCardHeader = styled.div`
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
  p {
    margin-top: 0.5em;
  }
`;

const ButtonsWrapper = styled.div`
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
`;

const TagButtons = styled.div`
  flex: 1 1 auto;
`;

const VideoCardDivider = styled(Divider)`
  margin: 5px 0 2px 0 !important;
`;

type VideoCardWithUserProps = {
  video: Video;
  scroll?: boolean;
  size?: "small";
};

// eslint-disable-next-line react/display-name
export const VideoCardWithUser = React.memo<VideoCardWithUserProps>(
  ({ video, scroll, size }) => {
    const { currentUser } = useContext(AuthContext);

    return (
      <Link to={`/${video.user.uid}/videos/${video.id}`}>
        <VideoCard scroll={scroll} size={size}>
          <Grid centered style={{ padding: "0.5em!important" }}>
            <Grid.Column width={3}>
              <Link to={`/${video.user.uid}/videos`}>
                <NoMarginImg circular src={video.user.photoURL} />
              </Link>
            </Grid.Column>
            <Grid.Column width={13} style={{ paddingLeft: "0" }}>
              <VideoCardHeader>
                <Link to={`/${video.user.uid}/videos`}>
                  {video.user.displayName}
                </Link>
                <time>
                  {moment(video.createdAt.toDate()).format("YYYY/MM/DD")}
                </time>
              </VideoCardHeader>
              <VideoView videoId={video.videoId} videoType={video.type} />
              <VideoCardTitle>{video.title}</VideoCardTitle>
              <VideoCardBody>
                <ButtonsWrapper>
                  <TagButtons>
                    {video.tags &&
                      video.tags.map((tag) => {
                        return (
                          <Link
                            to={`/${video.user.uid}/videos#${tag}`}
                            key={`${video.id}${tag}`}
                          >
                            <TagButton
                              primary
                              size="mini"
                              // onClick={handleTagClick}
                              taglabel={tag}
                              uid={video.user.uid}
                            >
                              {tag}
                            </TagButton>
                          </Link>
                        );
                      })}
                  </TagButtons>
                  {currentUser && (
                    <FavoriteButton currentUser={currentUser} video={video} />
                  )}
                </ButtonsWrapper>
                {video.comment && (
                  <>
                    <VideoCardDivider />
                    <VideoCardComment>{video.comment}</VideoCardComment>
                  </>
                )}
              </VideoCardBody>
            </Grid.Column>
          </Grid>
        </VideoCard>
      </Link>
    );
  }
);
