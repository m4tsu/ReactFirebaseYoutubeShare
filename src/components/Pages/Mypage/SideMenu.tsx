import React, { FC, useContext } from "react";
import { Menu, Image, Grid } from "semantic-ui-react";
import { SideMenuContext } from "context";
import styled from "styled-components";
import { CenteredMenu } from "components/Common/CenteredMenu";
import { AppUser } from "types/AppUser";
import { MenuItemLink } from "components/Common/MenuItemLink";

const Icon = styled(Image)`
  margin: 0px auto;
  margin-left: 0px;
`;

const DisplayName = styled(Grid.Column)`
  padding-top: 0px !important;
  font-weight: 500 !important;
`;

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
        <Grid verticalAlign="middle">
          <Grid.Column width={6}>
            <Icon src={currentUser.photoURL} circular />
          </Grid.Column>

          <DisplayName width={16}>{currentUser.displayName}</DisplayName>
        </Grid>
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
