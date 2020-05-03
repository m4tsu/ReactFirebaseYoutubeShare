import React, { FC } from "react";
import { AppUser } from "types/AppUser";
import { useFollow } from "utils/useFollow";
import { Button } from "semantic-ui-react";

type Props = {
  currentUser: AppUser | null;
  user: AppUser;
  isFollowing: boolean;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FollowBtn: FC<Props> = ({
  currentUser,
  user,
  isFollowing,
  setIsFollowing,
}) => {
  const { follow, unfollow, loading } = useFollow();

  if (!currentUser) {
    return <></>;
  }

  const handleClickFollow = () => {
    follow({ followedId: user.uid, currentUserId: currentUser.uid });
    setIsFollowing(true);
  };

  const handleClickUnfollow = () => {
    unfollow({ followedId: user.uid, currentUserId: currentUser.uid });
    setIsFollowing(false);
  };

  if (currentUser.uid !== user.uid) {
    if (isFollowing) {
      return (
        <Button color="teal" onClick={handleClickUnfollow} disabled={loading}>
          フォロー中
        </Button>
      );
    }

    return (
      <Button color="teal" onClick={handleClickFollow} disabled={loading} basic>
        フォロー
      </Button>
    );
  }

  return <></>;
};
