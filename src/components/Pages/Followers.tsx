import React, { FC, useEffect, useContext } from "react";
import { List, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useFollowers } from "utils/useFollowers";
import { Loading } from "components/Atoms/Loading";
import { SideMenuContext } from "context";

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

  return (
    <List>
      {followers.map((follow) => (
        <List.Item key={follow.uid}>
          <Link to={`/${follow.uid}/video`}>
            <Image src={follow.photoURL} />
            <p>{follow.displayName}</p>
          </Link>
        </List.Item>
      ))}
    </List>
  );
};
