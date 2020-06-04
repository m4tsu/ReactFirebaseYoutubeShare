import React, { FC, useContext } from "react";
import { Video } from "types/Video";
import styled from "styled-components";
import moment from "moment";
import { Segment, Grid, ButtonProps } from "semantic-ui-react";
import { VideoCardComment } from "components/Common/Comment";
import { VideoView } from "components/Pages/VideoView";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "context";
import {
  PaginationVideoCardBody,
  TagButton,
} from "components/Common/PaginationVideoCard";
import { NoMarginImg } from "components/Common/NoMarginImage";
import { FavoriteButton } from "components/Common/FavoriteBtn";

const VideoCard = styled(Segment)<{ scroll: boolean }>`
  max-width: 540px;
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
  display: flex;
  align-items: center;
  div {
    flex: 1 1 auto;
  }
  i {
    flex-shrink: 0;
    margin-left: 0.5em;
  }
  span {
    display: flex;
    flex-shrink: 0;
    align-items: baseline;
  }
`;

type VideoCardWithUserProps = {
  video: Video;
  scroll?: boolean;
};

export const VideoCardWithUser: FC<VideoCardWithUserProps> = ({
  video,
  scroll,
}) => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    history.push(`/${data.uid}/videos#${data.taglabel}`);
    e.preventDefault();
  };

  return (
    <Link to={`/${video.user.uid}/videos/${video.id}`}>
      <VideoCard scroll={scroll}>
        <Grid centered>
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
            <VideoCardBody>
              <VideoCardComment>
                <ButtonsWrapper>
                  <div>
                    {video.tags &&
                      video.tags.map((tag) => {
                        return (
                          <TagButton
                            key={`${video.id}${tag}`}
                            primary
                            size="mini"
                            onClick={handleTagClick}
                            taglabel={tag}
                            uid={video.user.uid}
                          >
                            {tag}
                          </TagButton>
                        );
                      })}
                  </div>
                  {currentUser && (
                    <FavoriteButton currentUser={currentUser} video={video} />
                  )}
                </ButtonsWrapper>

                <p>{video.comment}</p>
              </VideoCardComment>
            </VideoCardBody>
          </Grid.Column>
        </Grid>
      </VideoCard>
    </Link>
  );
};
