import React, { FC, useState, useEffect } from "react";
import { Modal, Button, TextAreaProps, TextArea } from "semantic-ui-react";
import { useHistory } from "react-router";
import { editVideo } from "utils/editVideo";

type Props = {
  uid: string;
  id: string;
  db: firebase.firestore.Firestore;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialComment: string;
};

export const EditModal: FC<Props> = ({
  uid,
  id,
  db,
  open,
  setOpen,
  initialComment,
}) => {
  const [comment, setComment] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    setComment(initialComment);
  }, [initialComment]);

  const closeModal = () => {
    setOpen(false);
  };

  const handleClickYes = async () => {
    await editVideo({ uid, id, db, comment });
    window.location.reload();
  };

  const handleChangeComment = (
    event: React.FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ) => {
    setComment(data.value as string);
  };

  console.log(comment);

  return (
    <Modal size="mini" open={open} onClose={closeModal}>
      <Modal.Header>コメントの編集</Modal.Header>
      <Modal.Content>
        <TextArea
          name="comment"
          onChange={handleChangeComment}
          label="コメント"
          value={comment}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="teal" onClick={closeModal}>
          キャンセル
        </Button>
        <Button positive content="決定" onClick={handleClickYes} />
      </Modal.Actions>
    </Modal>
  );
};
