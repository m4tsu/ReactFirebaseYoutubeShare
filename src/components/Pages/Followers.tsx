import React, { FC, useEffect, useContext } from "react";
import { useFollowers } from "hooks/useFollowers";
import { Loading } from "components/Common/Loading";
import { SideMenuContext } from "context";
import { Message } from "semantic-ui-react";
import { UsersList } from "./UsersList";

type FollowersProps = {
  uid: string;
};

export const Followers: FC<FollowersProps> = ({ uid }) => {
  const { followers, loading } = useFollowers(uid);
  const { setMenuLocation } = useContext(SideMenuContext);

  useEffect(() => {
    setMenuLocation("followers");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  if (loading) {
    return <Loading />;
  }

  if (followers.length === 0) {
    return <Message>フォロワーがいません</Message>;
  }

  return <UsersList users={followers} />;
};
