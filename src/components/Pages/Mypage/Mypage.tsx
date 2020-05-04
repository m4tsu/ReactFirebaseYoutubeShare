import React, { FC, useContext } from "react";
import { Grid, Dimmer, Loader } from "semantic-ui-react";
import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
import { Videos } from "components/Pages/Mypage/Video/Videos";
import { Video } from "components/Pages/Mypage/Video/Video";
import { New } from "components/Pages/Mypage/Video/New";
import { SideMenu } from "components/Pages/Mypage/SideMenu";
import { AuthContext } from "context";
import { Follows } from "components/Pages/Follows";
import { Followers } from "components/Pages/Followers";
import { NoMatch } from "../NoMatch";

export const Mypage: FC = () => {
  const match = useRouteMatch();
  const { currentUser, loading } = useContext(AuthContext);
  console.log(match);
  console.log("mypage");

  if (loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Grid>
      <Grid.Column computer={5} mobile={16}>
        <SideMenu />
      </Grid.Column>
      <Grid.Column computer={11} mobile={16}>
        <Switch>
          <Route exact path={`${match.path}/video`}>
            <Videos currentUser={currentUser} />
          </Route>
          <Route exact path={`${match.path}/video/new`} component={New} />
          <Route exact path={`${match.path}/following`}>
            <Follows uid={currentUser.uid} />
          </Route>
          <Route exact path={`${match.path}/followers`}>
            <Followers uid={currentUser.uid} />
          </Route>
          <Route exact path={`${match.path}/video/:id`}>
            <Video uid={currentUser.uid} />
          </Route>
          <Route component={NoMatch} />
        </Switch>
      </Grid.Column>
    </Grid>
  );
};
