import React, { FC, useContext, useState } from "react";
import { AuthContext } from "context";
import {
  Menu,
  Container,
  Image,
  Dropdown,
  Icon,
  Sidebar,
  Divider,
} from "semantic-ui-react";
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
  @media (max-width: 767px) {
    /* justify-content: flex-start; */
    /* max-width: 75% !important; */
  }
`;

const NoPaddedMenuItem = styled(Menu.Item)`
  padding: 0 !important;
  /* border-left: 1px solid rgba(34, 36, 38, 0.1); */
  /* border: none !important; */
`;

const NoPaddedMenuItemPC = styled(NoPaddedMenuItem)`
  @media (max-width: 767px) {
    display: none !important;
  }
`;

const NoPaddedMenuItemSP = styled(NoPaddedMenuItem)`
  padding-left: 1.2em !important;
  padding-right: 1.2em !important;
  i {
    margin: 0 auto !important;
  }
  cursor: pointer;
  @media (min-width: 768px) {
    display: none !important;
  }
`;

const SidebarPushable = styled(Sidebar.Pushable)`
  height: 100vh;
`;

const NoPaddedMenuItemSide = styled(NoPaddedMenuItem)`
  /* color: rgba(0, 0, 0, 0.87) !important; */
  ::before {
    content: none !important;
  }
  :hover {
    background: rgba(0, 0, 0, 0.05) !important;
    color: rgba(0, 0, 0, 0.95) !important;
  }

  a {
    color: inherit;
  }
`;

const SidebarDivider = styled(Divider)`
  margin: 0.4em 0 !important;
`;

const FlexBox = styled.div`
  display: flex;
`;

const DropdownPC = styled(Dropdown)`
  @media (max-width: 767px) {
    display: none !important;
  }
`;

export const AppBar: FC = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const { signout } = useAuth();
  const [visible, setVisible] = useState(false);

  const handleClickSPMenu = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Menu fixed="top" inverted color="teal">
        <HeaderContainer>
          <NoPaddedMenuItem header>
            <MenuItemLink to="/">つべったー</MenuItemLink>
          </NoPaddedMenuItem>
          <FlexBox>
            <NoPaddedMenuItemPC header>
              <MenuItemLink to="/users">ユーザーを探す</MenuItemLink>
            </NoPaddedMenuItemPC>
            <NoPaddedMenuItemPC header>
              <MenuItemLink to="/mypage/videos/new">
                動画を登録する
              </MenuItemLink>
            </NoPaddedMenuItemPC>
            {currentUser && (
              <NoPaddedMenuItemSP header onClick={handleClickSPMenu}>
                <Icon name="bars" size="large" />
              </NoPaddedMenuItemSP>
            )}

            {currentUser ? (
              <DropdownPC
                item
                trigger={<Image avatar src={currentUser.photoURL} />}
              >
                <Dropdown.Menu>
                  <DropdownLink to="/mypage/videos">マイページ</DropdownLink>
                  <DropdownLink to="/mypage/videos/new">
                    動画を登録する
                  </DropdownLink>
                  <DropdownLink to="/mypage/tags">タグ管理</DropdownLink>
                  <Dropdown.Divider />
                  <DropdownLink to="/mypage/following">フォロー中</DropdownLink>
                  <DropdownLink to="/mypage/followers">フォロワー</DropdownLink>
                  <DropdownLink to="/mypage/followers">
                    ユーザーを探す
                  </DropdownLink>
                  <Dropdown.Divider />
                  <DropdownLink to="/about">FAQ</DropdownLink>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={signout}>ログアウト</Dropdown.Item>
                </Dropdown.Menu>
              </DropdownPC>
            ) : (
              <Menu.Item>
                <Link to="/login">ログイン</Link>
              </Menu.Item>
            )}
          </FlexBox>
        </HeaderContainer>
      </Menu>
      {currentUser ? (
        <SidebarPushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            onHide={() => setVisible(false)}
            vertical
            direction="right"
            visible={visible}
            // secondary
            width="thin"
          >
            <NoPaddedMenuItemSide>
              <MenuItemLink to="/mypage/videos">マイページ</MenuItemLink>
            </NoPaddedMenuItemSide>
            <NoPaddedMenuItemSide>
              <MenuItemLink to="/mypage/videos/new">
                動画を登録する
              </MenuItemLink>
            </NoPaddedMenuItemSide>
            <SidebarDivider />
            <NoPaddedMenuItemSide>
              <MenuItemLink to="/mypage/following">フォロー中</MenuItemLink>
            </NoPaddedMenuItemSide>
            <NoPaddedMenuItemSide>
              <MenuItemLink to="/mypage/followers">フォロワー</MenuItemLink>
            </NoPaddedMenuItemSide>
            <NoPaddedMenuItemSide>
              <MenuItemLink to="/users">ユーザーを探す</MenuItemLink>
            </NoPaddedMenuItemSide>
            <SidebarDivider />
            <NoPaddedMenuItemSide>
              <MenuItemLink to="/about">FAQ</MenuItemLink>
            </NoPaddedMenuItemSide>
            <SidebarDivider />
            <Menu.Item onClick={signout}>ログアウト</Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>{children}</Sidebar.Pusher>
        </SidebarPushable>
      ) : (
        children
      )}
      {/* <SidebarPushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          onHide={() => setVisible(false)}
          vertical
          direction="right"
          visible={visible}
          // secondary
          width="thin"
        >
          <NoPaddedMenuItemSide>
            <MenuItemLink to="/mypage/videos">マイページ</MenuItemLink>
          </NoPaddedMenuItemSide>
          <NoPaddedMenuItemSide>
            <MenuItemLink to="/mypage/videos/new">動画を登録する</MenuItemLink>
          </NoPaddedMenuItemSide>
          <SidebarDivider />
          <NoPaddedMenuItemSide>
            <MenuItemLink to="/mypage/following">フォロー中</MenuItemLink>
          </NoPaddedMenuItemSide>
          <NoPaddedMenuItemSide>
            <MenuItemLink to="/mypage/followers">フォロワー</MenuItemLink>
          </NoPaddedMenuItemSide>
          <NoPaddedMenuItemSide>
            <MenuItemLink to="/users">ユーザーを探す</MenuItemLink>
          </NoPaddedMenuItemSide>
          <SidebarDivider />
          <NoPaddedMenuItemSide>
            <MenuItemLink to="/about">FAQ</MenuItemLink>
          </NoPaddedMenuItemSide>
          <SidebarDivider />
          <Menu.Item onClick={signout}>ログアウト</Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>{children}</Sidebar.Pusher>
      </SidebarPushable> */}
    </>
  );
};
