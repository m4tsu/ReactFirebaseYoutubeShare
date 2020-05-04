import React, { FC, useContext, useState } from "react";
import { useRouteMatch, RouteComponentProps } from "react-router";
import { useVideo } from "utils/useVideo";
import { VideoView } from "components/Pages/VideoView";
import { Loading } from "components/Atoms/Loading";
import styled from "styled-components";
import { Button, Divider } from "semantic-ui-react";
import { FirebaseContext } from "context";
import { DeleteModal } from "components/Pages/Mypage/Video/DeleteModal";
import { EditModal } from "components/Pages/Mypage/Video/EditModal";

type Params = RouteComponentProps & {
  id: string;
};

export const Comment = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const ActionBtnContainer = styled.div`
  text-align: right;
`;

export const Video: FC<{ uid: string }> = ({ uid }) => {
  const match = useRouteMatch<Params>();
  const { db } = useContext(FirebaseContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { id } = match.params;
  const { video, loading } = useVideo({ uid, id });
  console.log(match);
  console.log(video);

  const handleClickDeleteBtn = () => {
    setOpenDelete(true);
  };

  const handleClickEditBtn = () => {
    setOpenEdit(true);
  };

  if (loading) {
    return <Loading />;
  }

  if (!video) {
    return <p>見つかりません</p>;
  }

  return (
    <>
      <VideoView videoId={video.videoId} videoType={video.type} />
      <ActionBtnContainer>
        <Button
          color="teal"
          circular
          icon="pencil"
          onClick={handleClickEditBtn}
        />
        <Button
          color="red"
          circular
          icon="trash"
          onClick={handleClickDeleteBtn}
        />
      </ActionBtnContainer>
      <Divider />
      <Comment>{video.comment}</Comment>
      <DeleteModal
        uid={uid}
        id={id}
        db={db}
        open={openDelete}
        setOpen={setOpenDelete}
      />
      <EditModal
        uid={uid}
        id={id}
        db={db}
        open={openEdit}
        setOpen={setOpenEdit}
        initialComment={video.comment ? video.comment : ""}
      />
    </>
  );
};
