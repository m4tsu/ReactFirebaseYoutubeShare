import React, { FC, useContext } from "react";
import { Menu, Image, Dimmer, Loader, Grid } from "semantic-ui-react";
import { AuthContext, SideMenuContext } from "context";
import styled from "styled-components";
import { Link, useRouteMatch, Redirect } from "react-router-dom";

const Icon = styled(Image)`
  margin: 0px auto;
  margin-left: 0px;
  /* width: 55px;
  height: 55px; */
`;

const DisplayName = styled(Grid.Column)`
  padding-top: 0px !important;
`;

const StyledMenu = styled(Menu)`
  margin: 0 auto !important;
`;

export const SideMenu: FC = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const { menuLocation } = useContext(SideMenuContext);
  const match = useRouteMatch();
  console.log(match);

  if (loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <StyledMenu vertical>
      <Menu.Item>
        <Grid verticalAlign="middle">
          <Grid.Column width={6}>
            <Icon src={currentUser.photoURL} circular />
          </Grid.Column>

          <DisplayName width={16}>{currentUser.displayName}</DisplayName>
        </Grid>
      </Menu.Item>
      <Menu.Item active={menuLocation === "video"}>
        <Link to="/mypage/video">登録した動画</Link>
      </Menu.Item>
      <Menu.Item active={menuLocation === "following"}>
        <Link to="/mypage/following">フォロー中</Link>
      </Menu.Item>
      <Menu.Item active={menuLocation === "followers"}>
        <Link to="/mypage/followers">フォロワー</Link>
      </Menu.Item>
    </StyledMenu>
  );
};
