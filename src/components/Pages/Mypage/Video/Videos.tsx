import React, { FC, useContext } from "react";
import { Grid, List, Image, Dimmer, Loader } from "semantic-ui-react";
import { AuthContext } from "context";
import { useVideos } from "utils/useVideos";
import { Link } from "react-router-dom";
import { AppUser } from "types/AppUser";
import { Loading } from "components/Atoms/Loading";

type VideosProps = {
  currentUser: AppUser;
};

export const Videos: FC<VideosProps> = ({ currentUser }) => {
  // const { currentUser } = useContext(AuthContext);
  const { videos, loading } = useVideos(currentUser.uid);

  if (loading) {
    return <Loading />;
  }

  return (
    <List divided verticalAlign="middle">
      {videos.map((video) => {
        return (
          <List.Item key={video.videoId}>
            <Link to={`/mypage/video/${video.id}`}>
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
