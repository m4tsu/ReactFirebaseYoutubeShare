import React, { FC, useContext } from "react";
import { Grid, List, Image, Dimmer } from "semantic-ui-react";
import { AuthContext } from "context";
import { useVideos } from "utils/useVideos";
import { Link, useRouteMatch, RouteComponentProps } from "react-router-dom";
import { Loading } from "components/Atoms/Loading";

type Params = RouteComponentProps & {
  uid: string;
};

export const Videos: FC = () => {
  const match = useRouteMatch<Params>();
  console.log(match.params);
  const { uid } = match.params;
  const { videos, loading } = useVideos(uid);

  if (loading) {
    return <Loading />;
  }

  return (
    <List divided verticalAlign="middle">
      {videos.map((video) => {
        return (
          <List.Item key={video.videoId}>
            <Link to={`/${uid}/video/${video.id}`}>
              <Image
                src={`http://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
              />
            </Link>
            <p>{video.comment}</p>
          </List.Item>
        );
      })}
    </List>
  );
};
