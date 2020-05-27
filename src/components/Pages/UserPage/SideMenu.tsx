import React, { FC, useContext, useState, useEffect } from "react";
import { Menu, Image, Grid } from "semantic-ui-react";
import { AuthContext, FirebaseContext, SideMenuContext } from "context";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AppUser } from "types/AppUser";
import { checkFollow } from "utils/checkFollow";
import { CenteredMenu } from "components/Common/CenteredMenu";
import { MenuItemLink } from "components/Common/MenuItemLink";
import { UserInfo, CenteredImage } from "components/Common/SideMenuUserInfo";
import { FollowBtn } from "./FollowBtn";

const NoPaddedMenuItem = styled(Menu.Item)`
  padding: 0 !important;
`;

type SideMenuProps = {
  user: AppUser;
};

export const SideMenu: FC<SideMenuProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loadFollow, setLoadFollow] = useState(false);
  const { menuLocation } = useContext(SideMenuContext);
  const { db } = useContext(FirebaseContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      setLoadFollow(true);
      const result = await checkFollow({
        currentUser,
        uid: user.uid,
        db,
      });
      if (!unmounted) {
        setIsFollowing(result);
        setLoadFollow(false);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, [currentUser, db, user]);

  return (
    <CenteredMenu vertical size="large">
      <Menu.Item>
        <UserInfo>
          <CenteredImage src={user.photoURL} circular />
          <div>{user.displayName}</div>
          <div>
            {currentUser && (
              <FollowBtn
                currentUser={currentUser}
                user={user}
                setIsFollowing={setIsFollowing}
                isFollowing={isFollowing}
                loading={loadFollow}
              />
            )}
          </div>
        </UserInfo>
      </Menu.Item>
      <NoPaddedMenuItem active={menuLocation === "videos"}>
        <MenuItemLink to={`/${user.uid}/videos`}>登録動画一覧</MenuItemLink>
      </NoPaddedMenuItem>
      <NoPaddedMenuItem active={menuLocation === "following"}>
        <MenuItemLink to={`/${user.uid}/following`}>フォロー中</MenuItemLink>
      </NoPaddedMenuItem>
      <NoPaddedMenuItem active={menuLocation === "followers"}>
        <MenuItemLink to={`/${user.uid}/followers`}>フォロワー</MenuItemLink>
      </NoPaddedMenuItem>
    </CenteredMenu>
  );
};
