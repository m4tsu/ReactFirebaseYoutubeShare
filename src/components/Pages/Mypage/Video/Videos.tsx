import React, { FC, useContext, useEffect } from "react";
import { List, Image, Divider } from "semantic-ui-react";
import { useVideos } from "utils/useVideos";
import { Link } from "react-router-dom";
import { AppUser } from "types/AppUser";
import { Loading } from "components/Atoms/Loading";
import { SideMenuContext } from "context";
import { Comment } from "components/Pages/Mypage/Video/Video";
import styled from "styled-components";

type VideosProps = {
  currentUser: AppUser;
};

const StyledImage = styled(Image)`
  margin: 1em auto;
`;

export const Videos: FC<VideosProps> = ({ currentUser }) => {
  const { videos, loading } = useVideos(currentUser.uid);
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
              <Link to={`/mypage/video/${video.id}`}>
                <StyledImage
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
