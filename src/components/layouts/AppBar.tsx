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
  .ui.vertical.sidebar.menu > .item {
    ::before {
      content: none !important;
    }
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
      <Menu fixed="top" inverted color="teal" id="AppBar">
        <HeaderContainer>
          <Menu.Item header as={Link} to="/">
            つべったー
          </Menu.Item>
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
                <Dropdown.Menu id="AppSideMenu">
                  {/* <DropdownLink to="/mypage/videos">マイページ</DropdownLink> */}
                  <Dropdown.Item as={Link} to="/mypage/videos">
                    マイページ
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
                  <Dropdown.Item as={Link} to="/about">
                    FAQ
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={signout}>ログアウト</Dropdown.Item>
                </Dropdown.Menu>
              </DropdownPC>
            ) : (
              <Menu.Item as={Link} to="/login">
                ログイン
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
            width="thin"
          >
            <Menu.Item as={Link} to="/mypage/videos">
              マイページ
            </Menu.Item>
            <Menu.Item as={Link} to="/mypage/videos/new">
              動画を登録する
            </Menu.Item>
            <SidebarDivider />
            <Menu.Item as={Link} to="/mypage/following">
              フォロー中
            </Menu.Item>
            <Menu.Item as={Link} to="/mypage/followers">
              フォロワー
            </Menu.Item>
            <Menu.Item as={Link} to="/users">
              ユーザーを探す
            </Menu.Item>
            <SidebarDivider />
            <Menu.Item as={Link} to="/about">
              FAQ
            </Menu.Item>
            <SidebarDivider />
            <Menu.Item onClick={signout}>ログアウト</Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>{children}</Sidebar.Pusher>
        </SidebarPushable>
      ) : (
        children
      )}
    </>
  );
};
