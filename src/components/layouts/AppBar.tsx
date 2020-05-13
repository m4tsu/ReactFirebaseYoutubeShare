import React, { FC, useContext } from "react";
import { AuthContext } from "context";
import { Menu, Container, Image, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { useAuth } from "utils/useAuth";
import { Link } from "react-router-dom";
import { MenuItemLink } from "components/Common/MenuItemLink";

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

const HeaderContainer = styled(Container)`
  justify-content: space-between;
`;

const NoPaddedMenuItem = styled(Menu.Item)`
  padding: 0 !important;
  border-left: 1px solid rgba(34, 36, 38, 0.1);
`;

const FlexBox = styled.div`
  display: flex;
`;

export const AppBar: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { signout } = useAuth();

  return (
    <Menu fixed="top" inverted color="teal">
      <HeaderContainer>
        <NoPaddedMenuItem header>
          <MenuItemLink to="/">つべったー</MenuItemLink>
        </NoPaddedMenuItem>
        <FlexBox>
          <NoPaddedMenuItem header>
            <MenuItemLink to="/mypage/videos/new">動画を登録する</MenuItemLink>
          </NoPaddedMenuItem>
          {currentUser ? (
            <Dropdown
              item
              trigger={<Image avatar src={currentUser.photoURL} />}
            >
              <Dropdown.Menu>
                <DropdownLink to="/mypage/videos">マイページ</DropdownLink>
                <Dropdown.Divider />
                <DropdownLink to="/mypage/following">フォロー中</DropdownLink>
                <DropdownLink to="/mypage/followers">フォロワー</DropdownLink>
                <Dropdown.Divider />
                <DropdownLink to="/about">FAQ</DropdownLink>
                <Dropdown.Divider />
                <Dropdown.Item onClick={signout}>ログアウト</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Menu.Item>
              <Link to="/login">ログイン</Link>
            </Menu.Item>
          )}
        </FlexBox>
      </HeaderContainer>
    </Menu>
  );
};
