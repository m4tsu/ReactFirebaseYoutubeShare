/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { SideMenuContext } from "context";
import { CenteredMenu } from "components/Common/CenteredMenu";
import { AppUser } from "types/AppUser";
import { UserInfo, CenteredImage } from "components/Common/SideMenuUserInfo";
import { Link } from "react-router-dom";

type SideMenuProps = {
  currentUser: AppUser;
};

export const SideMenu = React.memo<SideMenuProps>(({ currentUser }) => {
  const { menuLocation } = useContext(SideMenuContext);

  return (
    <CenteredMenu vertical>
      <Menu.Item>
        <UserInfo>
          <CenteredImage src={currentUser.photoURL} circular />

          <div>{currentUser.displayName}</div>
        </UserInfo>
      </Menu.Item>
      <Menu.Item active={menuLocation === "home"} as={Link} to="/home">
        タイムライン
      </Menu.Item>
      <Menu.Item
        active={menuLocation === "videos"}
        as={Link}
        to="/mypage/videos"
      >
        動画
      </Menu.Item>
      <Menu.Item
        active={menuLocation === "new"}
        as={Link}
        to="/mypage/videos/new"
      >
        動画を登録する
      </Menu.Item>
      <Menu.Item
        active={menuLocation === "favorites"}
        as={Link}
        to="/mypage/favorites"
      >
        お気に入り
      </Menu.Item>
      <Menu.Item
        active={menuLocation === "following"}
        as={Link}
        to="/mypage/following"
      >
        フォロー中
      </Menu.Item>
      <Menu.Item
        active={menuLocation === "followers"}
        as={Link}
        to="/mypage/followers"
      >
        フォロワー
      </Menu.Item>
    </CenteredMenu>
  );
});
