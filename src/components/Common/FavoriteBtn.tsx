import React, { FC } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

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

type FavoriteButtonProps = {
  likeLoading: boolean;
  videoLiked: boolean;
  handleClickUnlike: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  handleClickLike: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
};

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  likeLoading,
  videoLiked,
  handleClickLike,
  handleClickUnlike,
}) => {
  return (
    <>
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
    </>
  );
};
