import React, { FC } from "react";
import { Grid, Dimmer, Loader } from "semantic-ui-react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import { Videos } from "components/Pages/UserPage/Video/Videos";
import { Video } from "components/Pages/UserPage/Video/Video";
import { SideMenu } from "components/Pages/UserPage/SideMenu";
import { useUser } from "utils/useUser";
import { Follows } from "components/Pages/Follows";
import { Followers } from "components/Pages/Followers";
import { NoMatch } from "../NoMatch";

type Params = RouteComponentProps & {
  uid: string;
};

export const UserPage: FC = () => {
  const match = useRouteMatch<Params>();
  const { uid } = match.params;
  const { user, loading } = useUser(uid);
  console.log(user);
  console.log(match);
  console.log("anothers page");

  if (loading || !user) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  return (
    <Grid>
      <Grid.Column computer={5} mobile={16}>
        <SideMenu user={user} />
      </Grid.Column>
      <Grid.Column computer={11} mobile={16}>
        <Switch>
          <Route exact path={`${match.path}/video`} component={Videos} />
          <Route exact path={`${match.path}/followers`}>
            <Followers uid={user.uid} />
          </Route>
          <Route exact path={`${match.path}/following`}>
            <Follows uid={user.uid} />
          </Route>

          <Route exact path={`${match.path}/video/:id`} component={Video} />
          <Route component={NoMatch} />
        </Switch>
      </Grid.Column>
    </Grid>
  );
};
