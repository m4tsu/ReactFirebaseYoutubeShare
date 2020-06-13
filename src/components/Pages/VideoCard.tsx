/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { Video } from "types/Video";
import styled from "styled-components";
import moment from "moment";
import { ButtonProps } from "semantic-ui-react";
import { VideoCardComment } from "components/Common/Comment";
import { VideoView } from "components/Pages/VideoView";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { AuthContext } from "context";
import {
  TagButton,
  PaginationVideoCard,
} from "components/Common/PaginationVideoCard";
import { FavoriteButton } from "components/Common/FavoriteBtn";

const VideoCardBody = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  flex-direction: column;
`;

const ButtonsWrapper = styled.div`
  margin-top: 0.2em;
  display: flex;
  align-items: center;
`;

const TagButtons = styled.div`
  flex: 1 1 auto;
`;

type VideoCardProps = {
  video: Video;
};

export const VideoCard = React.memo<VideoCardProps>(({ video }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { currentUser } = useContext(AuthContext);

  const handleTagClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    history.push(`/${data.uid}/videos#${data.taglabel}`);
    e.preventDefault();
  };

  return (
    <Link to={`${match.url}/${video.id}`}>
      <PaginationVideoCard>
        <VideoView
          videoId={video.videoId}
          videoType={video.type}
          // size="small"
        />
        <VideoCardBody>
          <span>{moment(video.updatedAt.toDate()).format("YYYY/MM/DD")}</span>
          <ButtonsWrapper>
            <TagButtons>
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
            </TagButtons>
            {currentUser && (
              <FavoriteButton currentUser={currentUser} video={video} />
            )}
          </ButtonsWrapper>

          <VideoCardComment>{video.comment}</VideoCardComment>
        </VideoCardBody>
      </PaginationVideoCard>
    </Link>
  );
});
