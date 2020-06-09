import React, { FC } from "react";
import { Grid, Divider } from "semantic-ui-react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Videos } from "components/Pages/Videos";
import { Video } from "components/Pages/Mypage/Video/Video";
import { New } from "components/Pages/Mypage/Video/New";
import { SideMenu } from "components/Pages/Mypage/SideMenu";
import { TagsContext } from "context";
import { Following } from "components/Pages/Following";
import { Followers } from "components/Pages/Followers";
import { useFetchTags } from "hooks/useFetchTags";
import { AppUser } from "types/AppUser";
import styled from "styled-components";
import { Tags } from "components/Pages/Mypage/Tag/Tags";
import { Favorites } from "components/Pages/Favorite/Favorites";
import { NoMatch } from "components/Pages/NoMatch";
import { TimeLine } from "components/Pages/Home/TimeLine";
import { useFetchVideos } from "hooks/useFetchVideos";

const DividerSP = styled(Divider)`
  width: 100%;
  @media (min-width: 992px) {
    display: none !important;
  }
`;

type MypageProps = {
  currentUser: AppUser;
};

export const Mypage = React.memo<MypageProps>(({ currentUser }) => {
  const match = useRouteMatch();
  const { tags, tagsLoading } = useFetchTags({ uid: currentUser.uid });
  const { videos, videosLoading } = useFetchVideos({ uid: currentUser.uid });

  return (
    <TagsContext.Provider value={{ tags, tagsLoading }}>
      <Grid>
        <Grid.Column computer={3} mobile={16}>
          <SideMenu currentUser={currentUser} />
        </Grid.Column>
        <DividerSP />
        <Grid.Column computer={13} mobile={16}>
          <Switch>
            <Route exact path="/home">
              <TimeLine currentUser={currentUser} />
            </Route>
            <Route exact path={`${match.path}/videos`}>
              <Videos
                user={currentUser}
                videos={videos}
                videosLoading={videosLoading}
              />
            </Route>
            <Route exact path={`${match.path}/videos/new`}>
              <New currentUser={currentUser} />
            </Route>
            <Route exact path={`${match.path}/favorites`}>
              <Favorites user={currentUser} />
            </Route>
            <Route exact path={`${match.path}/following`}>
              <Following uid={currentUser.uid} />
            </Route>
            <Route exact path={`${match.path}/followers`}>
              <Followers uid={currentUser.uid} />
            </Route>
            <Route exact path={`${match.path}/videos/:id`}>
              <Video currentUser={currentUser} />
            </Route>
            <Route exact path={`${match.path}/tags`}>
              <Tags currentUser={currentUser} />
            </Route>
            <Route component={NoMatch} />
          </Switch>
        </Grid.Column>
      </Grid>
    </TagsContext.Provider>
  );
});
