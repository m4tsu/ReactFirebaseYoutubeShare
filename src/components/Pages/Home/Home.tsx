import React, { useEffect, FC, useContext } from "react";
import { AuthContext, SideMenuContext } from "context";
import { Loading } from "components/Common/Loading";
import { Redirect } from "react-router";
import { Grid } from "semantic-ui-react";
import { SideMenu } from "components/Pages/Mypage/SideMenu";
import { TimeLine } from "components/Pages/Home/TimeLine";

export const Home: FC = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const { setMenuLocation } = useContext(SideMenuContext);

  useEffect(() => {
    setMenuLocation("home");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    // AboutページかLoginページかにリダイレクトしてログイン促す
    return <Redirect to="/login" />;
  }

  return (
    <Grid centered>
      <Grid.Column computer={4} mobile={16}>
        <SideMenu currentUser={currentUser} />
      </Grid.Column>
      <Grid.Column computer={12} mobile={16}>
        <TimeLine currentUser={currentUser} />
      </Grid.Column>
    </Grid>
  );
};
