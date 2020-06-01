import React, { FC, useContext, useState } from "react";
import { useRouteMatch, RouteComponentProps } from "react-router-dom";
import { TwitterShareButton } from "react-share";
import { useVideo } from "utils/useVideo";
import { VideoView } from "components/Pages/VideoView";
import { Loading } from "components/Common/Loading";
import styled from "styled-components";
import moment from "moment";
import { Button, Divider } from "semantic-ui-react";
import { FirebaseContext } from "context";
import { DeleteModal } from "components/Pages/Mypage/Video/DeleteModal";
import { EditModal } from "components/Pages/Mypage/Video/EditModal";
import { Comment } from "components/Common/Comment";
import { VideoDate } from "components/Common/VideoDate";
import { TagButtons } from "components/Pages/UserPage/Video/TagButtons";
import { AppUser } from "types/AppUser";

type Params = RouteComponentProps & {
  id: string;
};

const ActionBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Video: FC<{ currentUser: AppUser }> = ({ currentUser }) => {
  const match = useRouteMatch<Params>();
  const { db } = useContext(FirebaseContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { id } = match.params;
  const { video, loading } = useVideo({ uid: currentUser.uid, id });

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

  const shotenTitle =
    video.comment.length > 20
      ? `${video.comment.substr(0, 20)}...`
      : video.comment;

  return (
    <>
      <VideoView videoId={video.videoId} videoType={video.type} />
      <ActionBtnContainer>
        <div>
          <VideoDate>
            {moment(video.createdAt.toDate()).format("YYYY年MM月DD日")}
          </VideoDate>
          {video.tags && (
            <TagButtons
              tags={video.tags}
              uid={currentUser.uid}
              currentUser={currentUser}
            />
          )}
        </div>

        <div>
          <TwitterShareButton
            url={`https:/${process.env.REACT_APP_AUTH_DOMAIN}/${currentUser.uid}/videos/${id}`}
            title={`お気に入り動画を登録しました\n ${shotenTitle}`}
          >
            <Button color="twitter" icon="twitter" circular as="div" />
          </TwitterShareButton>
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
        </div>
      </ActionBtnContainer>
      <Divider />
      <Comment>{video.comment}</Comment>
      <DeleteModal
        uid={currentUser.uid}
        id={id}
        db={db}
        open={openDelete}
        setOpen={setOpenDelete}
      />
      <EditModal
        uid={currentUser.uid}
        video={video}
        db={db}
        open={openEdit}
        setOpen={setOpenEdit}
        initialComment={video.comment ? video.comment : ""}
      />
    </>
  );
};
