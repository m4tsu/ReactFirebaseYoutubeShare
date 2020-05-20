import React, { FC, useState } from "react";
import { AppUser } from "types/AppUser";
import { Modal, Button, Form, FormProps } from "semantic-ui-react";

type Props = {
  currentUser: AppUser;
  db: firebase.firestore.Firestore;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tag: string;
};

export const EditTagModal: FC<Props> = ({
  currentUser,
  db,
  open,
  setOpen,
  tag,
}) => {
  const [editedTag, setEditedTag] = useState(tag);
  console.log(editedTag);
  const closeModal = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    // await deleteVideo({ uid, id, db });
    // history.push(`/mypage/videos`);
    console.log("edit");
    console.log(editedTag);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTag(event.target.value);
  };

  return (
    <Modal size="small" open={open} onClose={closeModal}>
      <Modal.Header>タグの編集</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input defaultValue={tag} name="tag" onChange={handleChange} />
        </Form>
      </Modal.Content>

      <Modal.Actions>
        <Button onClick={closeModal} content="キャンセル" />
        <Button color="teal" content="変更する" onClick={handleClick} />
      </Modal.Actions>
    </Modal>
  );
};
