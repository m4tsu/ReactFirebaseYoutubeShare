import React, { FC, useContext, useEffect } from "react";
import { List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useFollows } from "utils/useFollows";
import { Loading } from "components/Atoms/Loading";
import { SideMenuContext } from "context";

type FollowingProps = {
  uid: string;
};

export const Follows: FC<FollowingProps> = ({ uid }) => {
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
    return <p>フォロー中のユーザーがいません</p>;
  }

  return (
    <List>
      {follows.map((follow) => (
        <List.Item key={follow.uid}>
          <Link to={`/${follow.uid}/videos`}>
            <Image src={follow.photoURL} />
            <p>{follow.displayName}</p>
          </Link>
        </List.Item>
      ))}
    </List>
  );
};
