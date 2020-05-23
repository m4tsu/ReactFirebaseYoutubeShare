import React, { FC, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { firebase } from "FirebaseConfig";
import styled from "@emotion/styled";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Grid, Header, Message, Segment, Divider } from "semantic-ui-react";
import { FirebaseContext, AuthContext } from "context";

const MessageHeader = styled(Message.Header)`
  text-align: left !important;
`;

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
        const dest = redirectUrl || "/home";
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
        <Grid.Column>
          <Header as="h2" textAlign="center">
            ログイン
          </Header>
          <Segment>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </Segment>

          <Message info>
            <MessageHeader>
              ログインすると次のことができるようになります
            </MessageHeader>
            <Message.List>
              <Message.Item>
                お気に入りの動画・再生リストを登録してツイッターで共有できます
              </Message.Item>
              <Message.Item>
                ユーザーをフォローすると、タイムラインでそのユーザーの更新を知ることができるようになります
              </Message.Item>
            </Message.List>
            <Divider />

            <MessageHeader>Twitterログインについて</MessageHeader>
            <Message.List>
              <Message.Item>
                ユーザー名・アイコンを取得しユーザー情報として利用します。
              </Message.Item>
              <Message.Item>
                上記以外の情報の取得や、勝手にツイートなどのアクションを行うことはありません。
              </Message.Item>
            </Message.List>
          </Message>
        </Grid.Column>
      </Grid>{" "}
    </GridWrapper>
  );
};
export default Signin;
