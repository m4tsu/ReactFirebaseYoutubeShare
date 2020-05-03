import React, { FC, useContext } from "react";
import { Menu, Image, Dimmer, Loader } from "semantic-ui-react";
import { AuthContext } from "context";
import styled from "styled-components";
import { Link, useRouteMatch, Redirect } from "react-router-dom";
import { AppUser } from "types/AppUser";

const Icon = styled(Image)`
  margin: 0 auto;
`;

// type SideMenuProps = {
//   user: AppUser;
// };

export const SideMenu: FC = () => {
  const { currentUser, loading } = useContext(AuthContext);
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
    <Menu vertical>
      <Menu.Item>
        <Icon src={currentUser.photoURL} circular />
        {currentUser.displayName}
      </Menu.Item>
      <Menu.Item>
        <Link to="/mypage/video">登録した動画</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/mypage/following">フォロー中</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/mypage/followers">フォロワー</Link>
      </Menu.Item>
    </Menu>
  );
};
