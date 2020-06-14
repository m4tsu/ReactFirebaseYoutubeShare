import React, { FC } from "react";
import { useRouteMatch, RouteComponentProps } from "react-router-dom";
import { useLikedUsers } from "hooks/useLikedUsers";
import { Loading } from "components/Common/Loading";
import { Header } from "semantic-ui-react";
import { UsersList } from "../UsersList";

type Params = RouteComponentProps & {
  // uid: string;
  id: string;
};

export const LikedUsers: FC<{ uid: string }> = ({ uid }) => {
  const match = useRouteMatch<Params>();
  const { id } = match.params;
  const { users, loading } = useLikedUsers({ uid, videoDocId: id });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header as="h3">お気に入りしたユーザー</Header>
      <UsersList users={users} />
    </>
  );
};
