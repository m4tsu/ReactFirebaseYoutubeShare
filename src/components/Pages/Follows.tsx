import React, { FC } from "react";
import { Dimmer, Loader, List, Image } from "semantic-ui-react";
import { Link, useRouteMatch } from "react-router-dom";
import { useFollows } from "utils/useFollows";
import { Loading } from "components/Atoms/Loading";

type FollowingProps = {
  uid: string;
};

export const Follows: FC<FollowingProps> = ({ uid }) => {
  const { follows, loading } = useFollows(uid);
  const match = useRouteMatch();

  if (loading) {
    return <Loading />;
  }

  return (
    <List>
      {follows.map((follow) => (
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
