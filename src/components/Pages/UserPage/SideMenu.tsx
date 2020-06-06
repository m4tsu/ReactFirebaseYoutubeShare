import React, { FC, useContext, useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { AuthContext, FirebaseContext, SideMenuContext } from "context";
import { Link } from "react-router-dom";
import { AppUser } from "types/AppUser";
import { checkFollow } from "utils/checkFollow";
import { CenteredMenu } from "components/Common/CenteredMenu";
// import { MenuItemLink } from "components/Common/MenuItemLink";
import { UserInfo, CenteredImage } from "components/Common/SideMenuUserInfo";
import { FollowBtn } from "./FollowBtn";

type SideMenuProps = {
  user: AppUser;
};

export const SideMenu: FC<SideMenuProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loadFollow, setLoadFollow] = useState(false);
  const { menuLocation } = useContext(SideMenuContext);
  const { db } = useContext(FirebaseContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      setLoadFollow(true);
      const result = await checkFollow({
        currentUser,
        uid: user.uid,
        db,
      });
      if (!unmounted) {
        setIsFollowing(result);
        setLoadFollow(false);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, [currentUser, db, user]);

  return (
    <CenteredMenu vertical size="large">
      <Menu.Item>
        <UserInfo>
          <CenteredImage src={user.photoURL} circular />
          <div>{user.displayName}</div>
          <div>
            {currentUser && (
              <FollowBtn
                currentUser={currentUser}
                user={user}
                setIsFollowing={setIsFollowing}
                isFollowing={isFollowing}
                loading={loadFollow}
              />
            )}
          </div>
        </UserInfo>
      </Menu.Item>
      <Menu.Item
        active={menuLocation === "videos"}
        as={Link}
        to={`/${user.uid}/videos`}
      >
        登録動画一覧
      </Menu.Item>
      <Menu.Item
        active={menuLocation === "following"}
        as={Link}
        to={`/${user.uid}/following`}
      >
        フォロー中
      </Menu.Item>
      <Menu.Item
        active={menuLocation === "followers"}
        as={Link}
        to={`/${user.uid}/followers`}
      >
        フォロワー
      </Menu.Item>
    </CenteredMenu>
  );
};
