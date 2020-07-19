import React, { FC, useContext, useState } from "react";
import { AuthContext } from "context";
import { Menu, Container, Image, Dropdown, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { useAuth } from "hooks/useAuth";
import { Link } from "react-router-dom";
import { MenuItemLink } from "components/Common/MenuItemLink";

const HeaderContainer = styled(Container)`
  justify-content: space-between;
  @media (max-width: 767px) {
  }
`;

const NoPaddedMenuItem = styled(Menu.Item)`
  padding: 0 !important;
`;

const NoPaddedMenuItemPC = styled(NoPaddedMenuItem)`
  @media (max-width: 767px) {
    display: none !important;
  }
`;

const DropdownMenu = styled(Dropdown.Menu)`
  left: auto !important;
  right: 0 !important;
`;

const FlexBox = styled.div`
  display: flex;
`;

const Logo = styled(Image)`
  height: 25px;
`;

export const AppBar: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { signout } = useAuth();

  return (
    <>
      <Menu fixed="top" inverted color="teal" id="AppBar">
        <HeaderContainer>
          <Menu.Item header as={Link} to="/">
            <Logo src={`${process.env.PUBLIC_URL}/logo-white.png`} />
          </Menu.Item>
          <FlexBox>
            <NoPaddedMenuItemPC header>
              <MenuItemLink to="/users">
                <Icon name="search" />
                ユーザーを探す
              </MenuItemLink>
            </NoPaddedMenuItemPC>
            <NoPaddedMenuItemPC header>
              <MenuItemLink to="/mypage/videos/new">
                動画を登録する
              </MenuItemLink>
            </NoPaddedMenuItemPC>

            {currentUser ? (
              <Dropdown
                item
                trigger={<Image avatar src={currentUser.photoURL} />}
              >
                <DropdownMenu id="AppSideMenu">
                  <Dropdown.Item as={Link} to="/mypage">
                    タイムライン
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/mypage/videos">
                    動画
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/mypage/videos/new">
                    動画を登録する
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/mypage/tags">
                    タグ管理
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/mypage/following">
                    フォロー中
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/mypage/followers">
                    フォロワー
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/users">
                    ユーザーを探す
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/faq">
                    FAQ
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={signout}>ログアウト</Dropdown.Item>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Menu.Item as={Link} to="/login">
                ログイン
              </Menu.Item>
            )}
          </FlexBox>
        </HeaderContainer>
      </Menu>
    </>
  );
};
