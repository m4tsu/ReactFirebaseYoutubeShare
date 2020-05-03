import React, { useState, useEffect, FC, FormEvent } from "react";
import {
  Button,
  Form,
  Segment,
  Radio,
  CheckboxProps,
  TextArea,
  TextAreaProps,
} from "semantic-ui-react";
import { VideoIdType, validateUrl } from "utils/validateUrl";
import { VideoView } from "components/Pages/VideoView";
import { useAddVideo } from "utils/useVideos";
import { VideoType } from "types/Video";
import { useHistory } from "react-router";
import styled from "styled-components";

const StyledTextArea = styled(TextArea)`
  margin-bottom: 1em !important;
`;

export const New: FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoType, setVideoType] = useState<VideoType>("video");
  const [urlValid, setUrlValid] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<VideoIdType>(null);
  const [comment, setComment] = useState<string>("");
  const history = useHistory();
  const { addVideo } = useAddVideo();

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
    addVideo({ videoId, type: videoType, comment });
    history.push("/mypage/video");
  };

  return (
    <>
      <Form size="large">
        <VideoView videoId={videoId} videoType={videoType} />
        <Segment stacked>
          <Form.Field>
            <Radio
              label="動画"
              name="radioGroup"
              value="video"
              checked={videoType === "video"}
              onChange={handleChangeType}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="再生リスト"
              name="radioGroup"
              value="playlist"
              checked={videoType === "playlist"}
              onChange={handleChangeType}
            />
          </Form.Field>
          <Form.Input
            fluid
            name="videoUrl"
            label="動画URL"
            placeholder={
              videoType === "video"
                ? "https://www.youtube.com/watch?v=ABCD123"
                : "https://www.youtube.com/playlist?list=ABCD123"
            }
            onChange={handleChangeUrl}
          />

          <StyledTextArea
            name="comment"
            onChange={handleChangeComment}
            label="コメント"
          />

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
    </>
  );
};
