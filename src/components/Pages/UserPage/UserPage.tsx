import React, { FC, useContext } from "react";
import { Grid, Divider } from "semantic-ui-react";
import {
  Switch,
  Route,
  useRouteMatch,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import { Videos } from "components/Pages/Videos";
import { Video } from "components/Pages/UserPage/Video/Video";
import { SideMenu } from "components/Pages/UserPage/SideMenu";
import { useUser } from "utils/useUser";
import { Following } from "components/Pages/Following";
import { Followers } from "components/Pages/Followers";
import { Loading } from "components/Common/Loading";
import { AuthContext, TagsContext } from "context";
import { useFetchTags } from "utils/useFetchTags";
import styled from "styled-components";
import { NoMatch } from "../NoMatch";
import { LikedUsers } from "../LikedUsers/LikedUsers";

const DividerSP = styled(Divider)`
  width: 100%;
  @media (min-width: 992px) {
    display: none !important;
  }
`;

type Params = RouteComponentProps & {
  uid: string;
};

export const UserPage: FC = () => {
  const match = useRouteMatch<Params>();
  const { currentUser } = useContext(AuthContext);
  const { uid } = match.params;
  const { user, loading } = useUser(uid);
  const { tags, tagsLoading } = useFetchTags({ uid });

  if (loading || !user) {
    return <Loading />;
  }

  if (currentUser && currentUser.uid === uid) {
    return <Redirect to="/mypage/videos" />;
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
              <Videos user={user} />
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
              component={LikedUsers}
            />
            <Route component={NoMatch} />
          </Switch>
        </Grid.Column>
      </Grid>
    </TagsContext.Provider>
  );
};
