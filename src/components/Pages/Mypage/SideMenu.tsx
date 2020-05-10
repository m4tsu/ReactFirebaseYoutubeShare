import React, { FC, useContext } from "react";
import { Menu, Image, Grid } from "semantic-ui-react";
import { SideMenuContext } from "context";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CenteredMenu } from "components/Common/CenteredMenu";
import { AppUser } from "types/AppUser";

const Icon = styled(Image)`
  margin: 0px auto;
  margin-left: 0px;
`;

const DisplayName = styled(Grid.Column)`
  padding-top: 0px !important;
  font-weight: 500 !important;
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
      <Menu.Item active={menuLocation === "home"}>
        <Link to="/home">タイムライン</Link>
      </Menu.Item>
      <Menu.Item active={menuLocation === "videos"}>
        <Link to="/mypage/videos">登録した動画</Link>
      </Menu.Item>
      <Menu.Item active={menuLocation === "following"}>
        <Link to="/mypage/following">フォロー中</Link>
      </Menu.Item>
      <Menu.Item active={menuLocation === "followers"}>
        <Link to="/mypage/followers">フォロワー</Link>
      </Menu.Item>
    </CenteredMenu>
  );
};
