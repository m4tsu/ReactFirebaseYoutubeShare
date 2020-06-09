import React, { FC, useContext } from "react";
import { useRouteMatch, RouteComponentProps } from "react-router-dom";
import moment from "moment";
import { useVideo } from "hooks/useVideo";
import { VideoView } from "components/Pages/VideoView";
import { Loading } from "components/Common/Loading";
import { Divider } from "semantic-ui-react";
import { Comment } from "components/Common/Comment";
import { VideoDate } from "components/Common/VideoDate";
import { AuthContext } from "context";
import { FavoriteButton } from "components/Common/FavoriteBtn";
import styled from "styled-components";
import { TagButtons } from "./TagButtons";

const VideoInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  time {
    flex: 0 1 auto;
  }
  i {
    flex-shrink: 0;
  }
  div {
    flex: 1 1 auto;
  }
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
      <VideoInfoWrapper>
        <VideoDate>
          {moment(video.updatedAt.toDate()).format("YYYY/MM/DD")}
        </VideoDate>
        <div>{video.tags && <TagButtons tags={video.tags} uid={uid} />}</div>
        {currentUser && (
          <FavoriteButton currentUser={currentUser} video={video} />
        )}
      </VideoInfoWrapper>
      <Divider />
      <Comment>{video.comment}</Comment>
    </>
  );
};
