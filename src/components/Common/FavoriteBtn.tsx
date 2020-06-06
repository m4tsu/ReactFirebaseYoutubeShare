import React, { FC, useContext, useState } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { AppUser } from "types/AppUser";
import { useLikeVideo } from "utils/useLikeVideo";
import { likeVideo } from "utils/likeVideo";
import { Video } from "types/Video";
import { unlikeVideo } from "utils/unlikeVideo";
import { FirebaseContext } from "context";
import { Link } from "react-router-dom";

const Favorited = styled(Icon)`
  cursor: pointer;
  transition-duration: 0.3s;
  &.yellow.icon {
    :hover {
      color: #eaae00 !important;
    }
  }
`;

const NotFavorited = styled(Icon)`
  cursor: pointer;
  transition-duration: 0.3s;
  &.grey.icon {
    :hover {
      color: #fbbd08 !important;
    }
  }
`;

const LikeCount = styled(Link)`
  :hover {
    text-decoration: underline;
  }
`;

type FavoriteButtonProps = {
  currentUser: AppUser;
  video: Video;
  count?: number;
};

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  currentUser,
  video,
}) => {
  const { db } = useContext(FirebaseContext);
  const [likeCount, setLikeCount] = useState<number>(video.likeCount);
  const { videoLiked, likeLoading, setVideoLiked } = useLikeVideo({
    currentUser,
    db,
    videoDocId: video.id,
  });

  const handleClickLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await likeVideo({
      db,
      currentUser,
      likedVideoUserId: video.user.uid,
      videoDocId: video.id,
    });
    setVideoLiked(true);
    setLikeCount((prevCount) => {
      const count = prevCount ? prevCount + 1 : 1;

      return count;
    });
  };

  const handleClickUnlike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await unlikeVideo({
      db,
      currentUser,
      likedVideoUserId: video.user.uid,
      videoDocId: video.id,
    });
    setVideoLiked(false);
    setLikeCount(likeCount - 1);
  };

  return (
    <span>
      {videoLiked ? (
        <Favorited
          name="favorite"
          color="yellow"
          size="large"
          disabled={likeLoading}
          onClick={handleClickUnlike}
        />
      ) : (
        <NotFavorited
          name="star outline"
          color="grey"
          size="large"
          disabled={likeLoading}
          onClick={handleClickLike}
        />
      )}
      <LikeCount to={`/${video.user.uid}/videos/${video.id}/favorites`}>
        {likeCount}
      </LikeCount>
    </span>
  );
};
