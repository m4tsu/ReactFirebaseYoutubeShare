import React, { FC, useEffect, useContext } from "react";
import { useFollowers } from "utils/useFollowers";
import { Loading } from "components/Common/Loading";
import { SideMenuContext } from "context";
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
    return <p>フォロワーがいません</p>;
  }

  return <UsersList users={followers} />;
};
