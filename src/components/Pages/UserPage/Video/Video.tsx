import React, { FC, useContext } from "react";
import { useRouteMatch, RouteComponentProps, Link } from "react-router-dom";
import moment from "moment";
import { useVideo } from "hooks/useVideo";
import { VideoView } from "components/Pages/VideoView";
import { Loading } from "components/Common/Loading";
import { Divider, Button, Header } from "semantic-ui-react";
import { Comment } from "components/Common/Comment";
import { AuthContext } from "context";
import { FavoriteButton } from "components/Common/FavoriteBtn";
import styled from "styled-components";
import { VideoTitle } from "components/Common/VideoTitle";

const TagButtons = styled.div`
  flex: 1 1 auto;
`;

const VideoInfoWrapper = styled.div`
  display: flex;
  time {
    margin-right: 0.5rem;
  }
  div {
    margin-right: 0.5rem;
  }
  align-items: center;
`;

type Params = RouteComponentProps & {
  uid: string;
  id: string;
};

export const Video: FC = () => {
  const match = useRouteMatch<Params>();
  const { uid, id } = match.params;
  const { video, loading } = useVideo({ uid, id });
  const { currentUser } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!video) {
    return <p>見つかりません</p>;
  }

  return (
    <>
      <VideoView videoId={video.videoId} videoType={video.type} />
      <VideoTitle as="h2">{video.title}</VideoTitle>
      <VideoInfoWrapper>
        <time>{moment(video.updatedAt.toDate()).format("YYYY/MM/DD")}</time>
        <TagButtons>
          {video.tags &&
            video.tags.map((tag) => {
              return (
                <Link
                  to={`/${video.user.uid}/videos#${tag}`}
                  key={`${video.id}${tag}`}
                >
                  <Button
                    primary
                    size="mini"
                    // onClick={handleTagClick}
                    taglabel={tag}
                    uid={video.user.uid}
                  >
                    {tag}
                  </Button>
                </Link>
              );
            })}
        </TagButtons>
        {currentUser && (
          <FavoriteButton currentUser={currentUser} video={video} />
        )}
      </VideoInfoWrapper>
      <Divider />
      <Comment>{video.comment}</Comment>
    </>
  );
};
