import React, { FC, useContext, useState, useEffect } from "react";
import { Menu, Image, Dimmer, Loader, Grid, Button } from "semantic-ui-react";
import { AuthContext, FirebaseContext } from "context";
import styled from "styled-components";
import { Link, useRouteMatch, Redirect } from "react-router-dom";
import { AppUser } from "types/AppUser";
import { ButtonMain } from "components/Atoms/Button";
import { useFollow } from "utils/useFollow";
import { checkFollow } from "utils/checkFollow";
import { FollowBtn } from "./FollowBtn";

const Icon = styled(Image)`
  margin: 0px auto;
  margin-left: 0px;
  width: 55px;
  height: 55px;
`;

const DisplayName = styled(Grid.Column)`
  padding-top: 0px !important;
`;

type SideMenuProps = {
  user: AppUser;
};

export const SideMenu: FC<SideMenuProps> = ({ user }) => {
  const { follow, unfollow, loading } = useFollow();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const { db } = useContext(FirebaseContext);
  const match = useRouteMatch();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    let unmounted = false;
    (async () => {
      const result = await checkFollow({
        currentUser,
        uid: user.uid,
        db,
      });
      if (!unmounted) {
        setIsFollowing(result);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, [currentUser, db, user]);

  return (
    <Menu vertical size="large">
      <Menu.Item>
        <Grid centered verticalAlign="middle">
          <Grid.Column width={6}>
            <Icon src={user.photoURL} circular />
          </Grid.Column>
          <Grid.Column width={10}>
            <FollowBtn
              currentUser={currentUser}
              user={user}
              setIsFollowing={setIsFollowing}
              isFollowing={isFollowing}
            />
          </Grid.Column>
          <DisplayName width={16}>{user.displayName}</DisplayName>
        </Grid>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/${user.uid}/video`}>登録した動画</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/${user.uid}/following`}>フォロー中</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/${user.uid}/followers`}>フォロワー</Link>
      </Menu.Item>
    </Menu>
  );
};
