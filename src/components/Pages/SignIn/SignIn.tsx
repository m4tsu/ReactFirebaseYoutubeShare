import React, { FC, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import firebase from "firebase/app";
// import firebaseui from "firebaseui"
import styled from "@emotion/styled";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Grid, Header, Message, Segment } from "semantic-ui-react";
import { FirebaseContext, AuthContext } from "context";
// import paths from "paths";

const GridWrapper = styled.main``;
const Signin: FC = () => {
  const { auth } = useContext(FirebaseContext);
  const { currentUser, setCredential } = useContext(AuthContext);
  const history = useHistory();
  const uiConfig: firebaseui.auth.Config = {
    signInFlow: "redirect",
    signInOptions: [
      {
        provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        customParameters: { lang: "ja" },
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        setCredential(authResult as firebase.auth.UserCredential);
        const dest = redirectUrl || "/";
        history.replace(dest);

        return false;
      },
    },
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <GridWrapper>
      <Grid textAlign="center" verticalAlign="middle">
        {" "}
        <Grid.Column>
          <Header as="h2" textAlign="center">
            {" "}
            ログイン/新規登録
          </Header>
          <Segment>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />{" "}
          </Segment>
          <Message>
            {" "}
            <p>動画を登録するためにはログインが必要です。</p>{" "}
          </Message>{" "}
        </Grid.Column>
      </Grid>{" "}
    </GridWrapper>
  );
};
export default Signin;
