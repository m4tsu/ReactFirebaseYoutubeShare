/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, FC, FormEvent, useContext } from "react";
import {
  Button,
  Form,
  Segment,
  Radio,
  CheckboxProps,
  TextArea,
  TextAreaProps,
  Icon,
} from "semantic-ui-react";
import { VideoIdType, validateUrl } from "utils/validateUrl";
import { VideoView } from "components/Pages/VideoView";
import { addVideo } from "utils/addVideo";
import { VideoType } from "types/Video";
import styled from "styled-components";
import { ShareModal } from "components/Common/ShareModal";
import { Description } from "components/Pages/Mypage/Video/Description";
import { AppUser } from "types/AppUser";
import { FirebaseContext, SideMenuContext } from "context";
import { TagsForm } from "components/Pages/Mypage/Video/TagsForm";
import { HelpModal } from "./HelpModal";

const StyledTextArea = styled(TextArea)`
  margin-bottom: 1em !important;
`;

const FormWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const HelpIcon = styled(Icon)`
  cursor: pointer;
`;

type NewProps = {
  currentUser: AppUser;
};

const placeholder = {
  video: "https://www.youtube.com/watch?v=ABCD123 or https://youtu.be/ABCD123",
  playlist: "https://www.youtube.com/playlist?list=ABCD123",
  nicovideo:
    "https://www.nicovideo.jp/watch/sm1234567 or https://nico.ms/sm1234567",
};

export const New: FC<NewProps> = ({ currentUser }) => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoType, setVideoType] = useState<VideoType>("video");
  const [urlValid, setUrlValid] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<VideoIdType>(null);
  const [comment, setComment] = useState<string>("");
  const [openShareModal, setOpenShareModal] = useState(false);
  const [videoTags, setVideoTags] = useState<string[]>([]);
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const { setMenuLocation } = useContext(SideMenuContext);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    setMenuLocation("new");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  useEffect(() => {
    const { valid, id } = validateUrl({ url: videoUrl, type: videoType });
    setUrlValid(valid);
    setVideoId(id);
  }, [videoUrl, videoType]);

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
  };

  const handleChangeType = (
    e: FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    const value = data.value as VideoType;
    setVideoType(value);
  };

  const handleChangeComment = (
    event: React.FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ) => {
    setComment(data.value as string);
  };

  const handleClick = () => {
    if (!videoId) return;
    addVideo({
      currentUser,
      db,
      videoId,
      type: videoType,
      comment,
      tags: videoTags,
    });
    setOpenShareModal(true);
  };

  const handleClickHelp = () => {
    setOpenHelpModal(true);
  };

  return (
    <FormWrapper>
      <Form size="large">
        <VideoView videoId={videoId} videoType={videoType} />
        <Segment stacked>
          <Form.Field>
            <Radio
              label="Youtube動画"
              name="radioGroup"
              value="video"
              checked={videoType === "video"}
              onChange={handleChangeType}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Youtube再生リスト"
              name="radioGroup"
              value="playlist"
              checked={videoType === "playlist"}
              onChange={handleChangeType}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="ニコニコ動画"
              name="radioGroup"
              value="nicovideo"
              checked={videoType === "nicovideo"}
              onChange={handleChangeType}
            />
          </Form.Field>
          <Form.Input
            fluid
            name="videoUrl"
            label={{
              children: (
                <>
                  動画URL{" "}
                  <HelpIcon name="help circle" onClick={handleClickHelp} />
                </>
              ),
            }}
            icon="play"
            iconPosition="left"
            placeholder={placeholder[videoType]}
            onChange={handleChangeUrl}
          />
          <Form.Field>
            <label htmlFor="tags">タグ</label>
            <TagsForm setVideoTags={setVideoTags} />
          </Form.Field>

          <Form.Field>
            <label htmlFor="comment">
              コメント
              <StyledTextArea
                id="comment"
                name="comment"
                maxLength="1000"
                onChange={handleChangeComment}
              />
            </label>
          </Form.Field>

          <Button
            color="teal"
            fluid
            size="large"
            type="submit"
            disabled={!urlValid}
            onClick={handleClick}
          >
            この動画を登録
          </Button>
        </Segment>
      </Form>
      <Description />
      <ShareModal
        sharePath={`/${currentUser.uid}/videos/${videoId}`}
        redirectUrl="/mypage/videos"
        open={openShareModal}
        setOpen={setOpenShareModal}
        shareTitle={comment}
      />
      <HelpModal open={openHelpModal} setOpen={setOpenHelpModal} />
    </FormWrapper>
  );
};
