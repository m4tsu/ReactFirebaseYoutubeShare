import React, { FC, useContext, useState } from "react";
import { useRouteMatch, RouteComponentProps, Link } from "react-router-dom";
import { TwitterShareButton } from "react-share";
import { useVideo } from "hooks/useVideo";
import { VideoView } from "components/Pages/VideoView";
import { Loading } from "components/Common/Loading";
import styled from "styled-components";
import moment from "moment";
import { Button, Divider, Header } from "semantic-ui-react";
import { FirebaseContext } from "context";
import { DeleteModal } from "components/Pages/Mypage/Video/DeleteModal";
import { EditModal } from "components/Pages/Mypage/Video/EditModal";
import { Comment } from "components/Common/Comment";
import { AppUser } from "types/AppUser";
import { FavoriteButton } from "components/Common/FavoriteBtn";
import { VideoTitle } from "components/Common/VideoTitle";

type Params = RouteComponentProps & {
  id: string;
};

const ActionBtnContainer = styled.div`
  display: flex;
  time {
    margin-right: 0.5rem;
  }
  div {
    margin-right: 0.5rem;
  }
  /* justify-content: space-between; */
  align-items: center;
`;

const TagButtons = styled.div`
  flex: 1 1 auto;
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
    video.title.length > 40 ? `${video.title.substr(0, 40)}...` : video.title;

  return (
    <>
      <VideoView videoId={video.videoId} videoType={video.type} />
      <VideoTitle as="h2">{video.title}</VideoTitle>
      <ActionBtnContainer>
        <time>{moment(video.createdAt.toDate()).format("YYYY年MM月DD日")}</time>
        <TagButtons>
          {video.tags &&
            video.tags.map((tag) => {
              return (
                <Link to={`/mypage/videos#${tag}`} key={`${video.id}${tag}`}>
                  <Button
                    primary
                    size="mini"
                    // onClick={handleTagClick}
                    taglabel={tag}
                    uid={video.user.uid}
                  >
                    {tag}
                  </Button>
                </Link>
              );
            })}
        </TagButtons>
        {currentUser && (
          <FavoriteButton
            currentUser={currentUser}
            video={video}
            path="/mypage/videos"
          />
        )}

        <TwitterShareButton
          url={`https:/${process.env.REACT_APP_AUTH_DOMAIN}/${currentUser.uid}/videos/${id}`}
          title={`${shotenTitle} \n 登録しました `}
          hashtags={["つべったー"]}
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
        initialTitle={video.title}
      />
    </>
  );
};
