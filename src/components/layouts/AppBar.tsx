import React, { FC, useContext } from "react";
import { AuthContext } from "context";
import { Menu, Container, Image, Dropdown, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { useAuth } from "utils/useAuth";
import { Link } from "react-router-dom";

const DropdownLink = styled(Link)`
  display: block;
  padding: 1em;
  text-align: center;
  color: rgba(0, 0, 0, 0.87) !important;

  :hover {
    background: rgba(0, 0, 0, 0.05) !important;
    color: rgba(0, 0, 0, 0.95) !important;
  }
`;

export const AppBar: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { signout } = useAuth();

  return (
    <Menu fixed="top" inverted color="teal">
      <Container>
        <Menu.Item header>
          <Link to="/">
            <Icon name="youtube" />
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link to="/mypage/videos/new">動画を登録する</Link>
        </Menu.Item>
        {currentUser ? (
          <Dropdown item trigger={<Image avatar src={currentUser.photoURL} />}>
            <Dropdown.Menu>
              {/* <Dropdown.Item>
                <MenuLink to="/mypage/video">マイページ</MenuLink>
              </Dropdown.Item> */}
              <DropdownLink to="/mypage/videos">マイページ</DropdownLink>
              <Dropdown.Divider />
              <DropdownLink to="/mypage/following">フォロー中</DropdownLink>
              <Dropdown.Divider />
              <Dropdown.Item onClick={signout}>ログアウト</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Menu.Item>
            <Link to="/login">ログイン</Link>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};
