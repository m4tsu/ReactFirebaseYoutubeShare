import React, { FC } from "react";
import { Message } from "semantic-ui-react";
import styled from "styled-components";

const AboutMessage = styled(Message)`
  font-size: 14px !important;
  span {
    font-size: 20px !important;
  }
  p {
    margin: 0.5rem 0 !important;
  }
`;

const Title = styled.span`
  font-size: 16px !important;
`;

export const About: FC = () => {
  return (
    <AboutMessage color="teal">
      <Title>Tubetter</Title>{" "}
      はお気に入りの動画を登録してシェアするサービスです。
      <p>
        「オススメをどんどん共有したいけどツイッターだとすぐ流れてしまう...」
      </p>
      <p>「かといってYoutubeやニコニコ動画のアカウントは晒したくない...」</p>
      <p>
        このサービスに動画を登録してツイッターのフォロワーに共有して、オススメの動画を知ってもらいましょう。
      </p>
      <p>
        ログインすると、フォローしたユーザーの更新をタイムラインでチェックすることもできます。
      </p>
    </AboutMessage>
  );
};
