/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextAreaProps,
  TextArea,
  Form,
} from "semantic-ui-react";
import { editVideo } from "hooks/editVideo";
import { Video } from "types/Video";
import { TagsForm } from "components/Pages/Mypage/Video/TagsForm";

type Props = {
  uid: string;
  video: Video;
  db: firebase.firestore.Firestore;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialComment: string;
  initialTitle: string;
};

export const EditModal: FC<Props> = ({
  uid,
  video,
  db,
  open,
  setOpen,
  initialComment,
  initialTitle,
}) => {
  const [comment, setComment] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [videoTags, setVideoTags] = useState<string[]>([]);
  useEffect(() => {
    setComment(initialComment);
    setTitle(initialTitle);
  }, [initialComment, initialTitle]);

  const closeModal = () => {
    setOpen(false);
  };

  const handleClickYes = async () => {
    await editVideo({ uid, video, db, comment, title, tags: videoTags });
    setOpen(false);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeComment = (
    _: React.FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ) => {
    setComment(data.value as string);
  };

  return (
    <Modal size="small" open={open} onClose={closeModal}>
      <Modal.Header>編集</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            fluid
            name="title"
            label="タイトル"
            onChange={handleChangeTitle}
            value={title}
          />
          <Form.Field>
            <label htmlFor="tags">タグ</label>
            <TagsForm setVideoTags={setVideoTags} initialTags={video.tags} />
          </Form.Field>
          <Form.Field>
            <label htmlFor="comment">コメント</label>
            <TextArea
              name="comment"
              onChange={handleChangeComment}
              label="コメント"
              value={comment}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button content="キャンセル" onClick={closeModal} />
        <Button color="teal" content="更新する" onClick={handleClickYes} />
      </Modal.Actions>
    </Modal>
  );
};
