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
            {" "}
            Youtube{" "}
          </a>
          に公開されている動画・再生リストのみ可能です。
        </Message.Item>
        <Message.Item>
          自身で投稿・作成した動画・再生リストを登録した場合、自身のYoutubeチャンネルページが公開されることに留意してください。Googleアカウント名や登録チャンネル、再生リスト等の公開設定に注意してください。
        </Message.Item>
      </Message.List>
    </Message>
  );
};
