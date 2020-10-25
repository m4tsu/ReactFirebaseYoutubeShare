/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { SideMenuContext } from "context";
import { CenteredMenu } from "components/Common/CenteredMenu";
import { AppUser } from "types/AppUser";
import { UserInfo, CenteredImage } from "components/Common/SideMenuUserInfo";
import { Link } from "react-router-dom";
import { TwitterShareButton } from "react-share";
import styled from "styled-components";

const TweetButton = styled(Button)`
  padding: 0.4rem 1rem !important;
  margin-top: 1rem !important;
  font-size: 10px !important;
`;

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
          <TwitterShareButton
            url={`https://${process.env.REACT_APP_AUTH_DOMAIN}/${currentUser.uid}/videos`}
            title="オススメ動画をシェア | Tubetter"
            hashtags={["つべったー"]}
          >
            <TweetButton color="twitter">
              <Icon name="twitter" />
              ツイート
            </TweetButton>
          </TwitterShareButton>
        </UserInfo>
      </Menu.Item>
      <Menu.Item active={menuLocation === "home"} as={Link} to="/mypage">
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
