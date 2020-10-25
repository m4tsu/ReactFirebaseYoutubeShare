import React, { FC } from "react";
import { Modal, Message, Icon } from "semantic-ui-react";
import styled from "styled-components";

const HignLignt = styled.span`
  color: rgb(6, 95, 212);
`;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HelpModal: FC<Props> = ({ open, setOpen }) => {
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <Modal.Header>動画URLの取得方法</Modal.Header>
      <Modal.Content>
        <Message>
          <Message.Header>Youtube動画</Message.Header>
          <p>
            動画の下の <Icon name="share" />
            共有 をクリックして表示されるURLを
            <HignLignt>[コピー]</HignLignt>{" "}
          </p>
          もしくは、動画ページのURLアドレスバーからコピー
          <p />
          <Message.Header>Youtube再生リスト</Message.Header>
          <p>
            再生リストページの <Icon name="share" />{" "}
            をクリックして表示されるURLを <HignLignt>[コピー]</HignLignt>
          </p>
          <p>もしくは、再生リストページのURLアドレスバーからコピー</p>
          <Message.Header>ニコニコ動画</Message.Header>
          <p>
            動画ページの <Icon name="share alternate" /> をクリックして [リンク]
            を選択し、<HignLignt>コードをコピーする</HignLignt>
          </p>
        </Message>
      </Modal.Content>
    </Modal>
  );
};
