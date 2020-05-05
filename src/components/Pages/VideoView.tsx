import React, { FC } from "react";
import { VideoIdType } from "utils/validateUrl";
import styled from "styled-components";
import { VideoType } from "types/Video";

type Props = {
  videoId: VideoIdType;
  videoType: VideoType;
  size?: "small";
};

const sizeList = {
  small: {
    height: 270,
    width: 480,
  },
  large: {
    height: 450,
    width: 800,
  },
};

const ResponsiveVideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  margin-bottom: 1em;
  iframe {
    position: absolute;
    top: 0;
    right: 0;
    width: 100% !important;
    height: 100% !important;
  }
`;

export const VideoView: FC<Props> = ({ videoId, videoType, size }) => {
  if (!videoId) {
    return <p>見つかりません</p>;
  }
  if (size) {
    return (
      <iframe
        src={
          videoType === "playlist"
            ? `https://www.youtube.com/embed/videoseries?list=${videoId}`
            : `https://www.youtube.com/embed/${videoId}`
        }
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded content from youtube."
        width="480"
        height="270"
      />
    );
  }

  return (
    <ResponsiveVideoWrapper>
      <iframe
        src={
          videoType === "playlist"
            ? `https://www.youtube.com/embed/videoseries?list=${videoId}`
            : `https://www.youtube.com/embed/${videoId}`
        }
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded content from youtube."
      />
    </ResponsiveVideoWrapper>
  );
};
