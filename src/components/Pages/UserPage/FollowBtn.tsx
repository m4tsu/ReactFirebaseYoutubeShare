import React, { FC, useContext } from "react";
import { AppUser } from "types/AppUser";
import { Button } from "semantic-ui-react";
import { follow } from "hooks/follow";
import { unFollow } from "hooks/unFollow";
import { FirebaseContext } from "context";

type Props = {
  currentUser: AppUser;
  user: AppUser;
  isFollowing: boolean;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

export const FollowBtn: FC<Props> = ({
  currentUser,
  user,
  isFollowing,
  setIsFollowing,
  loading,
}) => {
  const { db } = useContext(FirebaseContext);

  const handleClickFollow = () => {
    follow({ followUserId: user.uid, currentUser, db });
    setIsFollowing(true);
  };

  const handleClickUnfollow = () => {
    unFollow({ unFollowUserId: user.uid, currentUser, db });
    setIsFollowing(false);
  };

  if (currentUser.uid !== user.uid) {
    if (isFollowing) {
      return (
        <Button color="teal" onClick={handleClickUnfollow} loading={loading}>
          フォロー中
        </Button>
      );
    }

    return (
      <Button color="teal" onClick={handleClickFollow} basic loading={loading}>
        フォロー
      </Button>
    );
  }

  return <></>;
};
