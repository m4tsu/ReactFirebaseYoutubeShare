import React, { FC, useContext } from "react";
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
  span {
    margin-bottom: 0.5em;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  div {
    flex: 1 1 auto;
  }
  i {
    flex-shrink: 0;
    margin-left: 0.5em;
  }
`;

type VideoCardProps = {
  video: Video;
};

export const VideoCard: FC<VideoCardProps> = ({ video }) => {
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
            <div>
              {video.tags &&
                video.tags.map((tag) => {
                  return (
                    <TagButton
                      key={`${video.id}${tag}`}
                      primary
                      size="mini"
                      onClick={handleTagClick}
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

          <VideoCardComment>
            <p>{video.comment}</p>
          </VideoCardComment>
        </VideoCardBody>
      </PaginationVideoCard>
    </Link>
  );
};
