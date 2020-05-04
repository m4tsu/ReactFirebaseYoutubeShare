import { VideoType } from "types/Video";

export type VideoIdType = null | string;

type Props = {
  type: VideoType;
  url: string;
};

type Result = {
  valid: boolean;
  id: VideoIdType;
};

const videoPatterns = [
  /^https:\/\/youtu.be\/(.+)$/,
  /^https:\/\/www.youtube.com\/watch\?v=(.+)$/,
];
const playlistPattern = /^https:\/\/www.youtube.com\/playlist\?list=(.+)$/;

export const validateUrl = ({ type, url }: Props): Result => {
  let id = null;
  let valid = false;
  if (type === "video") {
    const result = url.match(videoPatterns[0]) || url.match(videoPatterns[1]);
    if (result) {
      id = result[1];
      valid = true;
    }
  }
  if (type === "playlist") {
    const result = url.match(playlistPattern);
    if (result) {
      id = result[1];
      valid = true;
    }
  }

  return { valid, id };
};
