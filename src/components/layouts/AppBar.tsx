import React, { FC, useContext } from "react";
import { AuthContext } from "context";
import { Menu, Container, Image, Dropdown, Button } from "semantic-ui-react";
import logo from "logo.svg";
import styled from "styled-components";
import { useAuth } from "utils/useAuth";
import { Link } from "react-router-dom";
import { MenuLink } from "components/Atoms/MenuLInk";

const StyledMenu = styled(Menu)`
  background-color: ${({ theme }) => theme.colors.main};
`;

const StyledMenuItem = styled(Menu.Item)`
  padding: 0 !important;
  a {
    text-align: center;
    display: block;
    padding: 0.8em;
  }
`;

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
            <Image size="mini" src={logo} />
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link to="/mypage/video/new">動画を登録する</Link>
        </Menu.Item>
        {currentUser ? (
          <Dropdown item trigger={<Image avatar src={currentUser.photoURL} />}>
            <Dropdown.Menu>
              {/* <Dropdown.Item>
                <MenuLink to="/mypage/video">マイページ</MenuLink>
              </Dropdown.Item> */}
              <DropdownLink to="/mypage/video">マイページ</DropdownLink>
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
