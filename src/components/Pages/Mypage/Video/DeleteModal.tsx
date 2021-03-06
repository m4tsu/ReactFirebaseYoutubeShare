import React, { FC } from "react";
import { Modal, Button } from "semantic-ui-react";
import { useHistory } from "react-router";
import { deleteVideo } from "hooks/deleteVideo";

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

  const handleClickYes = async () => {
    await deleteVideo({ uid, id, db });
    history.push(`/mypage/videos`);
  };

  return (
    <Modal size="mini" open={open} onClose={closeModal}>
      <Modal.Header>登録の削除</Modal.Header>
      <Modal.Content>
        <p>この動画を削除してよろしいですか？</p>
      </Modal.Content>
      <Modal.Actions>
        <Button content="キャンセル" onClick={closeModal} />
        <Button negative content="削除する" onClick={handleClickYes} />
      </Modal.Actions>
    </Modal>
  );
};
