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

// const MenuLink = styled(Link)`
//   color: inherit !important;
// `;

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
              <Dropdown.Item>
                <MenuLink to="/mypage/video">マイページ</MenuLink>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>フォロー中</Dropdown.Item>
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
