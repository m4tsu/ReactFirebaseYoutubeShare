import React, { FC } from "react";
import { Grid } from "semantic-ui-react";
import {
  Switch,
  Route,
  useRouteMatch,
  RouteComponentProps,
} from "react-router-dom";
import { Videos } from "components/Pages/Videos";
import { Video } from "components/Pages/UserPage/Video/Video";
import { SideMenu } from "components/Pages/UserPage/SideMenu";
import { useUser } from "utils/useUser";
import { Follows } from "components/Pages/Follows";
import { Followers } from "components/Pages/Followers";
import { Loading } from "components/Atoms/Loading";
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
    return <Loading />;
  }

  return (
    <Grid>
      <Grid.Column computer={5} mobile={16}>
        <SideMenu user={user} />
      </Grid.Column>
      <Grid.Column computer={11} mobile={16}>
        <Switch>
          <Route exact path={`${match.path}/videos`} component={Videos}>
            <Videos uid={user.uid} />
          </Route>
          <Route exact path={`${match.path}/followers`}>
            <Followers uid={user.uid} />
          </Route>
          <Route exact path={`${match.path}/following`}>
            <Follows uid={user.uid} />
          </Route>
          <Route exact path={`${match.path}/videos/:id`} component={Video} />
          <Route component={NoMatch} />
        </Switch>
      </Grid.Column>
    </Grid>
  );
};
