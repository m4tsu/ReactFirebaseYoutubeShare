import React, { FC, useContext } from "react";
import { useRouteMatch, RouteComponentProps } from "react-router-dom";
import moment from "moment";
import { useVideo } from "utils/useVideo";
import { VideoView } from "components/Pages/VideoView";
import { Loading } from "components/Common/Loading";
import { Divider, Icon } from "semantic-ui-react";
import { Comment } from "components/Common/Comment";
import { VideoDate } from "components/Common/VideoDate";
import { AuthContext, FirebaseContext } from "context";
import { likeVideo } from "utils/likeVideo";
import { unlikeVideo } from "utils/unlikeVideo";
import { useLikeVideo } from "utils/useLikeVideo";
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
  const { db } = useContext(FirebaseContext);
  const { videoLiked, likeLoading, setVideoLiked } = useLikeVideo({
    db,
    currentUser,
    videoDocId: id,
  });

  if (loading) {
    return <Loading />;
  }

  if (!video) {
    return <p>見つかりません</p>;
  }

  const handleClickLike = async () => {
    if (currentUser) {
      await likeVideo({
        db,
        currentUser,
        likedVideoUserId: uid,
        videoDocId: id,
      });
      setVideoLiked(true);
    }
  };

  const handleClickUnlike = async () => {
    if (currentUser) {
      await unlikeVideo({
        db,
        currentUser,
        likedVideoUserId: uid,
        videoDocId: id,
      });
      setVideoLiked(false);
    }
  };

  return (
    <>
      <VideoView videoId={video.videoId} videoType={video.type} />
      <VideoInfoWrapper>
        <VideoDate>
          {moment(video.updatedAt.toDate()).format("YYYY年MM月DD日")}
        </VideoDate>
        <div>{video.tags && <TagButtons tags={video.tags} uid={uid} />}</div>

        <FavoriteButton
          videoLiked={videoLiked}
          likeLoading={likeLoading}
          handleClickLike={handleClickLike}
          handleClickUnlike={handleClickUnlike}
        />
      </VideoInfoWrapper>
      <Divider />
      <Comment>{video.comment}</Comment>
    </>
  );
};
