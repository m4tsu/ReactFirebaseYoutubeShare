import React from "react";
import { Grid, Divider } from "semantic-ui-react";
import {
  Switch,
  Route,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import { Videos } from "components/Pages/Videos";
import { Video } from "components/Pages/UserPage/Video/Video";
import { SideMenu } from "components/Pages/UserPage/SideMenu";
import { useUser } from "hooks/useUser";
import { Following } from "components/Pages/Following";
import { Followers } from "components/Pages/Followers";
import { Loading } from "components/Common/Loading";
import { TagsContext } from "context";
import { useFetchTags } from "hooks/useFetchTags";
import styled from "styled-components";
import { useFetchVideos } from "hooks/useFetchVideos";
import { LikedUsers } from "components/Pages/LikedUsers/LikedUsers";
import { Favorites } from "components/Pages/Favorite/Favorites";
import { NoMatch } from "../NoMatch";

const DividerSP = styled(Divider)`
  width: 100%;
  @media (min-width: 992px) {
    display: none !important;
  }
`;

type Params = RouteComponentProps & {
  uid: string;
};

export const UserPage = React.memo(() => {
  const match = useRouteMatch<Params>();
  const { uid } = match.params;
  const { user, loading } = useUser(uid);
  const { tags, tagsLoading } = useFetchTags({ uid });
  const { videos, videosLoading } = useFetchVideos({ uid });

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <TagsContext.Provider value={{ tags, tagsLoading }}>
      <Grid>
        <Grid.Column computer={3} mobile={16}>
          <SideMenu user={user} />
        </Grid.Column>
        <DividerSP />
        <Grid.Column computer={13} mobile={16}>
          <Switch>
            <Route exact path={`${match.path}/videos`} component={Videos}>
              <Videos
                user={user}
                videos={videos}
                videosLoading={videosLoading}
              />
            </Route>
            <Route exact path={`${match.path}/favorites`}>
              <Favorites user={user} />
            </Route>
            <Route exact path={`${match.path}/followers`}>
              <Followers uid={user.uid} />
            </Route>
            <Route exact path={`${match.path}/following`}>
              <Following uid={user.uid} />
            </Route>
            <Route exact path={`${match.path}/videos/:id`} component={Video} />
            <Route
              exact
              path={`${match.path}/videos/:id/favorites`}
              // component={LikedUsers}
            >
              <LikedUsers uid={user.uid} />
            </Route>
            <Route component={NoMatch} />
          </Switch>
        </Grid.Column>
      </Grid>
    </TagsContext.Provider>
  );
});
