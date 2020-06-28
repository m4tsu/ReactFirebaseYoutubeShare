import React, { FC } from "react";
import { Message, Image } from "semantic-ui-react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 70%;
  margin: 0 auto;
`;

export const About: FC = () => {
  const FAQs = [
    {
      header: "どんなサービス？",
      content:
        "人にオススメしたいYoutube動画を登録して、Twitterのフォロワーにシェアするサービスです。",
    },
    {
      header: "Youtubeから直接シェアできるけど？",
      content:
        "シェアツイートはすぐに流れてしまいます。このサービスに動画を登録するとフォロワーはいつでも見返すことができます。また、このサービス上でユーザーをフォローすると新たな動画の登録をタイムラインでチェックできます。",
    },
    {
      header: "カテゴライズなど整理する方法が欲しい",
      content:
        "タグ付けによるカテゴライズができます。または、Youtubeで作成した再生リストをそのまま登録することができます。ただしその場合自身のYoutubeチャンネルが公開されるので、Googleアカウント名や再生リスト等の公開設定に注意してください。",
    },
  ];

  return (
    <Wrap>
      <Image src={`${process.env.PUBLIC_URL}/tubetter-sample4.png`} bordered />
      <Message color="teal">
        {FAQs.map((faq) => {
          return (
            <>
              <Message.Header>Q. {faq.header}</Message.Header>
              <p>A. {faq.content}</p>
            </>
          );
        })}
      </Message>
    </Wrap>
  );
};
