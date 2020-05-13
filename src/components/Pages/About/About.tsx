import React, { FC } from "react";
import { Message } from "semantic-ui-react";

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
        "シェアツイートはすぐに流れてしまいます。このサービスに動画を登録するとフォロワーはいつでも見返すことができます。また、このサービス上でユーザーをフォローすると新たに登録された動画が自身のタイムラインに表示されるようになります。",
    },
    {
      header: "カテゴライズなど整理する方法が欲しい",
      content:
        "このサービスでは再生リストも登録することができます。Youtube上で自身で再生リストを作成しそれを登録することをお勧めします。ただしその場合、自身のYoutubeチャンネルが公開されることに留意してください。Googleアカウント名や再生リスト等の公開設定に注意してください。",
    },
    {
      header: "リスト化したいけど自身のYoutubeチャンネルを公開したくない...",
      content:
        "それでも整理する方法はあった方が良いとは感じているので近い内に実装する予定です。",
    },
    {
      header: "タイムラインに表示される条件は？",
      content:
        "動画を登録した時と、更新した時です。再生リストを登録していて、新たに動画を追加した場合などは更新することで新たにフォロワーのタイムラインに表示されます。",
    },
  ];

  return (
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
  );
};
