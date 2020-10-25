import React, { FC } from "react";
import { Message } from "semantic-ui-react";

export const Description: FC = () => {
  return (
    <Message>
      <Message.Header>動画の登録について</Message.Header>
      <Message.List>
        <Message.Item>
          登録は
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Youtube
          </a>
          の動画・再生リスト、もしくは
          <a
            href="https://www.nicovideo.jp/"
            target="_blank"
            rel="noreferrer noopener"
          >
            ニコニコ動画
          </a>
          に投稿されている動画のみ可能です。
        </Message.Item>
        <Message.Item>
          指定の形式のURLを貼り付けると動画が表示されます。正しく表示されない場合、URLが間違っている可能性があります。
        </Message.Item>
        <Message.Item>
          自身で投稿・作成した動画・再生リストを登録した場合、自身のYoutubeチャンネルページが公開されることに留意してください。Googleアカウント名や登録チャンネル、再生リスト等の公開設定に注意してください。
        </Message.Item>
      </Message.List>
    </Message>
  );
};
