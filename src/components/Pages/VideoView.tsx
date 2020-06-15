/* eslint-disable react/display-name */
import React, { FC } from "react";
import { VideoIdType } from "hooks/validateUrl";
import styled from "styled-components";
import { VideoType } from "types/Video";

type Props = {
  videoId: VideoIdType;
  videoType: VideoType;
  size?: "small";
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

export const VideoView = React.memo<Props>(({ videoId, videoType, size }) => {
  let embedSrc = "";
  if (videoType === "video") {
    embedSrc = `https://www.youtube.com/embed/${videoId}`;
  }
  if (videoType === "playlist") {
    embedSrc = `https://www.youtube.com/embed/videoseries?list=${videoId}`;
  }
  if (videoType === "nicovideo") {
    embedSrc = `https://embed.nicovideo.jp/watch/${videoId}?oldScript=1&referer=&from=0&allowProgrammaticFullScreen=1`;
  }

  if (!videoId) {
    return <></>;
  }
  if (size) {
    return (
      <iframe
        src={embedSrc}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded content."
        width="480"
        height="270"
      />
    );
  }

  return (
    <ResponsiveVideoWrapper>
      <iframe
        src={embedSrc}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded content"
      />
    </ResponsiveVideoWrapper>
  );
});
