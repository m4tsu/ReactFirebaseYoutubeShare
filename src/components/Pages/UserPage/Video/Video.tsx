import React, { FC } from "react";
import { useRouteMatch, RouteComponentProps } from "react-router";
import { useVideo } from "utils/useVideo";
import { VideoView } from "components/Pages/VideoView";
import { Loading } from "components/Common/Loading";
import { Divider } from "semantic-ui-react";
import { Comment } from "components/Common/Comment";

type Params = RouteComponentProps & {
  uid: string;
  id: string;
};

export const Video: FC = () => {
  const match = useRouteMatch<Params>();
  const { uid, id } = match.params;
  const { video, loading } = useVideo({ uid, id });

  if (loading) {
    return <Loading />;
  }

  if (!video) {
    return <p>見つかりません</p>;
  }

  return (
    <>
      <VideoView videoId={video.videoId} videoType={video.type} />
      <Divider />
      <Comment>{video.comment}</Comment>
    </>
  );
};
