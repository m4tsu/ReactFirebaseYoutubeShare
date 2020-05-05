import React, { FC, useContext, useState, useEffect } from "react";
import { Menu, Image, Grid } from "semantic-ui-react";
import { AuthContext, FirebaseContext, SideMenuContext } from "context";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AppUser } from "types/AppUser";
import { checkFollow } from "utils/checkFollow";
import { FollowBtn } from "./FollowBtn";

const Icon = styled(Image)`
  margin: 0px auto;
  margin-left: 0px;
`;

const DisplayName = styled(Grid.Column)`
  padding-top: 0px !important;
`;

const StyledMenu = styled(Menu)`
  margin: 0 auto !important;
`;

type SideMenuProps = {
  user: AppUser;
};

export const SideMenu: FC<SideMenuProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const { menuLocation } = useContext(SideMenuContext);
  const { db } = useContext(FirebaseContext);
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
    <StyledMenu vertical size="large">
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
      <Menu.Item active={menuLocation === "videos"}>
        <Link to={`/${user.uid}/videos`}>登録した動画</Link>
      </Menu.Item>
      <Menu.Item active={menuLocation === "following"}>
        <Link to={`/${user.uid}/following`}>フォロー中</Link>
      </Menu.Item>
      <Menu.Item active={menuLocation === "followers"}>
        <Link to={`/${user.uid}/followers`}>フォロワー</Link>
      </Menu.Item>
    </StyledMenu>
  );
};
