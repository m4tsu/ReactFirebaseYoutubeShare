import React, { FC, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { Videos } from "components/Pages/Videos";
import { Video } from "components/Pages/Mypage/Video/Video";
import { New } from "components/Pages/Mypage/Video/New";
import { SideMenu } from "components/Pages/Mypage/SideMenu";
import { AuthContext } from "context";
import { Following } from "components/Pages/Following";
import { Followers } from "components/Pages/Followers";
import { Loading } from "components/Common/Loading";
import { NoMatch } from "../NoMatch";
import { TimeLine } from "../Home/TimeLine";

export const Mypage: FC = () => {
  const match = useRouteMatch();
  const { currentUser, loading } = useContext(AuthContext);
  console.log(loading);
  console.log(currentUser);
  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Grid>
      <Grid.Column computer={4} mobile={16}>
        <SideMenu currentUser={currentUser} />
      </Grid.Column>
      <Grid.Column computer={12} mobile={16}>
        <Switch>
          <Route exact path="/home">
            <TimeLine currentUser={currentUser} />
          </Route>
          <Route exact path={`${match.path}/videos`}>
            <Videos uid={currentUser.uid} />
          </Route>
          <Route exact path={`${match.path}/videos/new`}>
            <New currentUser={currentUser} />
          </Route>
          <Route exact path={`${match.path}/following`}>
            <Following uid={currentUser.uid} />
          </Route>
          <Route exact path={`${match.path}/followers`}>
            <Followers uid={currentUser.uid} />
          </Route>
          <Route exact path={`${match.path}/videos/:id`}>
            <Video uid={currentUser.uid} />
          </Route>
          <Route component={NoMatch} />
        </Switch>
      </Grid.Column>
    </Grid>
  );
};
