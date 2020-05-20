import React, { FC } from "react";
import { AppUser } from "types/AppUser";
import { Modal, Button } from "semantic-ui-react";
import { deleteTag } from "utils/deleteTag";

type Props = {
  currentUser: AppUser;
  db: firebase.firestore.Firestore;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tag: string;
};

export const DeleteTagModal: FC<Props> = ({
  currentUser,
  db,
  open,
  setOpen,
  tag,
}) => {
  const closeModal = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    await deleteTag({ currentUser, db, tag });
    // history.push(`/mypage/videos`);
    console.log("delete");
    setOpen(false);
  };

  return (
    <Modal size="mini" open={open} onClose={closeModal}>
      <Modal.Header>タグの削除</Modal.Header>
      <Modal.Content>
        <p>
          <b>{tag}</b> を削除してよろしいですか？
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={closeModal} content="キャンセル" />
        <Button negative content="削除する" onClick={handleClick} />
      </Modal.Actions>
    </Modal>
  );
};
