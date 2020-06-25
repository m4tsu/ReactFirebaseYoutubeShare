import React, { FC } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { TwitterShareButton } from "react-share";
import styled from "styled-components";

const ModalHeader = styled(Modal.Header)`
  text-align: right;
`;

const ModalContent = styled(Modal.Content)`
  display: flex !important;
  justify-content: center !important;
`;

type ShareModalProps = {
  sharePath: string;
  redirectUrl?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shareTitle: string;
};

export const ShareModal: FC<ShareModalProps> = ({
  sharePath,
  redirectUrl,
  open,
  setOpen,
  shareTitle,
}) => {
  const history = useHistory();
  const shareUrl = `https://${process.env.REACT_APP_AUTH_DOMAIN}${sharePath}`;
  const shotenTitle =
    shareTitle.length > 40 ? `${shareTitle.substr(0, 40)}...` : "";

  const closeModal = () => {
    setOpen(false);
    if (redirectUrl) {
      history.push({ pathname: redirectUrl });
    }
  };

  return (
    <Modal size="mini" open={open} onClose={closeModal}>
      <ModalHeader>
        <Button icon="cancel" circular onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
        <TwitterShareButton
          url={shareUrl}
          title={`${shotenTitle}\n 登録しました`}
          hashtags={["つべったー"]}
        >
          <Button color="twitter" as="div">
            <Icon name="twitter" />
            Twitterに投稿する
          </Button>
        </TwitterShareButton>
      </ModalContent>
    </Modal>
  );
};
