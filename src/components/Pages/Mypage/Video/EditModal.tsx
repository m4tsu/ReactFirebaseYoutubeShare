import React, { FC, useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextAreaProps,
  TextArea,
  Form,
} from "semantic-ui-react";
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
    _: React.FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ) => {
    setComment(data.value as string);
  };

  return (
    <Modal size="tiny" open={open} onClose={closeModal}>
      <Modal.Header>コメントの編集</Modal.Header>
      <Modal.Content>
        <Form>
          <TextArea
            name="comment"
            onChange={handleChangeComment}
            label="コメント"
            value={comment}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={closeModal}>
          キャンセル
        </Button>
        <Button color="teal" content="決定" onClick={handleClickYes} />
      </Modal.Actions>
    </Modal>
  );
};
