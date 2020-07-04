import React, { FC } from "react";
import styled from "styled-components";
import { Grid, Message, Divider } from "semantic-ui-react";
import { SignInButton } from "components/Pages/SignIn/SignInButton";

const MessageHeader = styled(Message.Header)`
  text-align: left !important;
`;

const GridWrapper = styled.main``;
const Signin: FC = () => {
  return (
    <GridWrapper>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column>
          <SignInButton />
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
