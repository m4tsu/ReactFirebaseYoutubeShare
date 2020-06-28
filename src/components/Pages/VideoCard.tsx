/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { Video } from "types/Video";
import styled from "styled-components";
import moment from "moment";
import { ButtonProps, Divider } from "semantic-ui-react";
import { VideoCardComment } from "components/Common/Comment";
import { VideoView } from "components/Pages/VideoView";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { AuthContext } from "context";
import {
  TagButton,
  PaginationVideoCard,
} from "components/Common/PaginationVideoCard";
import { FavoriteButton } from "components/Common/FavoriteBtn";
import { VideoCardTitle } from "components/Common/VideoTitle";

const VideoCardBody = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  flex-direction: column;
`;

const VideoTitle = styled.h4`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
`;

const ButtonsWrapper = styled.div`
  margin-top: 0.2em;
  display: flex;
  align-items: center;
  time {
    flex-shrink: 0;
    margin-right: 1rem;
  }
`;

const TagButtons = styled.div`
  flex: 1 1 auto;
`;

const VideoCardDivider = styled(Divider)`
  margin: 5px 0 2px 0 !important;
`;

type VideoCardProps = {
  video: Video;
};

export const VideoCard = React.memo<VideoCardProps>(({ video }) => {
  const match = useRouteMatch();
  const { currentUser } = useContext(AuthContext);

  return (
    <Link to={`${match.url}/${video.id}`}>
      <PaginationVideoCard>
        <VideoView
          videoId={video.videoId}
          videoType={video.type}
          // size="small"
        />
        <VideoCardBody>
          <VideoCardTitle>{video.title}</VideoCardTitle>

          <ButtonsWrapper>
            <time>{moment(video.updatedAt.toDate()).format("YYYY/MM/DD")}</time>

            <TagButtons>
              {video.tags &&
                video.tags.map((tag) => {
                  return (
                    <Link to={`${match.url}#${tag}`} key={`${video.id}${tag}`}>
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
              <FavoriteButton
                currentUser={currentUser}
                video={video}
                path={match.url}
              />
            )}
          </ButtonsWrapper>
          {video.comment && (
            <>
              <VideoCardDivider />
              <VideoCardComment>{video.comment}</VideoCardComment>
            </>
          )}
        </VideoCardBody>
      </PaginationVideoCard>
    </Link>
  );
});
