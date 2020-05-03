import React, { FC, useContext, useState } from "react";
import { useRouteMatch, RouteComponentProps, useHistory } from "react-router";
import { useVideo } from "utils/useVideo";
import { VideoView } from "components/Pages/VideoView";
import { Loading } from "components/Atoms/Loading";
import styled from "styled-components";
import { Icon, Button } from "semantic-ui-react";
import { FirebaseContext } from "context";
import { deleteVideo } from "utils/deleteVideo";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";

type Params = RouteComponentProps & {
  id: string;
};

const Wrapper = styled.div`
  p {
    margin-top: 1em;
  }
`;

const ActionBtnContainer = styled.div`
  text-align: right;
`;

export const Video: FC<{ uid: string }> = ({ uid }) => {
  const match = useRouteMatch<Params>();
  const { db } = useContext(FirebaseContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const history = useHistory();
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
      <Wrapper>
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
        <p>{video.comment}</p>
      </Wrapper>
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
