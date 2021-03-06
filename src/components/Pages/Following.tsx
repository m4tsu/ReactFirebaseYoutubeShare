import React, { FC, useContext, useEffect } from "react";
import { useFollows } from "hooks/useFollows";
import { Loading } from "components/Common/Loading";
import { SideMenuContext } from "context";
import { Message } from "semantic-ui-react";
import { UsersList } from "./UsersList";

type FollowingProps = {
  uid: string;
};

export const Following: FC<FollowingProps> = ({ uid }) => {
  const { follows, loading } = useFollows(uid);
  const { setMenuLocation } = useContext(SideMenuContext);

  useEffect(() => {
    setMenuLocation("following");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  if (loading) {
    return <Loading />;
  }

  if (follows.length === 0) {
    return <Message>フォロー中のユーザーがいません</Message>;
  }

  return <UsersList users={follows} />;
};
