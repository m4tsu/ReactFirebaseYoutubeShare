import React, { FC, useContext, useEffect } from "react";
import { Grid, List, Image, Dimmer, Divider } from "semantic-ui-react";
import { AuthContext, SideMenuContext } from "context";
import { useVideos } from "utils/useVideos";
import { Link, useRouteMatch, RouteComponentProps } from "react-router-dom";
import { Loading } from "components/Atoms/Loading";
import { Comment } from "components/Pages/Mypage/Video/Video";

type Params = RouteComponentProps & {
  uid: string;
};

export const Videos: FC = () => {
  const match = useRouteMatch<Params>();
  console.log(match.params);
  const { uid } = match.params;
  const { videos, loading } = useVideos(uid);
  const { setMenuLocation } = useContext(SideMenuContext);

  useEffect(() => {
    setMenuLocation("video");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  if (loading) {
    return <Loading />;
  }

  return (
    <List verticalAlign="middle">
      {videos.map((video) => {
        return (
          <>
            <List.Item key={video.videoId}>
              <Link to={`/${uid}/video/${video.id}`}>
                <Image
                  src={`http://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                />
              </Link>
              <Comment>{video.comment}</Comment>
            </List.Item>
            <Divider />
          </>
        );
      })}
    </List>
  );
};
