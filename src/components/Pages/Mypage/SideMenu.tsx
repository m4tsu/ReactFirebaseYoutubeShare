import React, { FC, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { SideMenuContext } from "context";
import styled from "styled-components";
import { CenteredMenu } from "components/Common/CenteredMenu";
import { AppUser } from "types/AppUser";
import { MenuItemLink } from "components/Common/MenuItemLink";
import { UserInfo, CenteredImage } from "components/Common/SideMenuUserInfo";

const NoPaddedMenuItem = styled(Menu.Item)`
  padding: 0 !important;
`;

type SideMenuProps = {
  currentUser: AppUser;
};

export const SideMenu: FC<SideMenuProps> = ({ currentUser }) => {
  const { menuLocation } = useContext(SideMenuContext);

  return (
    <CenteredMenu vertical>
      <Menu.Item>
        <UserInfo>
          <CenteredImage src={currentUser.photoURL} circular />

          <div>{currentUser.displayName}</div>
        </UserInfo>
      </Menu.Item>
      <NoPaddedMenuItem active={menuLocation === "home"}>
        <MenuItemLink to="/home">タイムライン</MenuItemLink>
      </NoPaddedMenuItem>
      <NoPaddedMenuItem active={menuLocation === "videos"}>
        <MenuItemLink to="/mypage/videos">登録動画一覧</MenuItemLink>
      </NoPaddedMenuItem>
      <NoPaddedMenuItem active={menuLocation === "new"}>
        <MenuItemLink to="/mypage/videos/new">動画を登録する</MenuItemLink>
      </NoPaddedMenuItem>
      <NoPaddedMenuItem active={menuLocation === "favorites"}>
        <MenuItemLink to="/mypage/favorites">お気に入り</MenuItemLink>
      </NoPaddedMenuItem>
      <NoPaddedMenuItem active={menuLocation === "following"}>
        <MenuItemLink to="/mypage/following">フォロー中</MenuItemLink>
      </NoPaddedMenuItem>
      <NoPaddedMenuItem active={menuLocation === "followers"}>
        <MenuItemLink to="/mypage/followers">フォロワー</MenuItemLink>
      </NoPaddedMenuItem>
    </CenteredMenu>
  );
};
