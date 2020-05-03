import React, { FC, useState } from "react";
import { Modal, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { deleteVideo } from "utils/deleteVideo";

type DeleteModalProps = {
  uid: string;
  id: string;
  db: firebase.firestore.Firestore;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteModal: FC<DeleteModalProps> = ({
  uid,
  id,
  db,
  open,
  setOpen,
}) => {
  const history = useHistory();
  const closeModal = () => {
    setOpen(false);
  };
  const handleClickYes = () => {
    deleteVideo({ uid, id, db });
    history.push(`/mypage/video`);
  };

  return (
    <Modal size="mini" open={open} onClose={closeModal}>
      <Modal.Header>登録の解除</Modal.Header>
      <Modal.Content>
        <p>この動画の登録を解除してよろしいですか？</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="teal" onClick={closeModal}>
          No
        </Button>
        <Button negative content="Yes" onClick={handleClickYes} />
      </Modal.Actions>
    </Modal>
  );
};
