/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/display-name */
import React, { FC, useEffect } from "react";
import { VideoIdType } from "hooks/validateUrl";
import styled from "styled-components";
import { VideoType } from "types/Video";
import Youtube, { Options } from "react-youtube";
import axios from "axios";
import { functions } from "FirebaseConfig";

type Props = {
  videoId: VideoIdType;
  videoType: VideoType;
  setVideoTitle: React.Dispatch<React.SetStateAction<string>>;
};

// export const VideoPlayer: FC<Props> =
export const VideoPlayer = React.memo<Props>(
  ({ videoId, videoType, setVideoTitle }) => {
    if (!videoId) {
      return <></>;
    }

    if (videoType === "nicovideo") {
      const getNicovideoTitle = functions.httpsCallable("getNicovideoTitle");
      getNicovideoTitle({ videoId })
        .then((result) => {
          if (result.data.title) {
            setVideoTitle(result.data.title);
          } else {
            setVideoTitle("");
          }
        })
        .catch((err) => {
          console.log(err);
          setVideoTitle("");
        });

      return (
        <ResPonsivePlayer>
          <iframe
            src={`https://embed.nicovideo.jp/watch/${videoId}?oldScript=1&referer=&from=0&allowProgrammaticFullScreen=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded content"
          />
        </ResPonsivePlayer>
      );
    }

    if (videoType === "video") {
      const opts: Options = {
        height: "",
        width: "",
        playerVars: {
          list: videoId || undefined,
          listType: "playlist",
        },
      };

      const onVideoReady = (event: any) => {
        setVideoTitle(event.target.getVideoData().title);
      };

      return (
        <ResPonsivePlayer>
          <Youtube onReady={onVideoReady} videoId={videoId} opts={opts} />
        </ResPonsivePlayer>
      );
    }

    if (videoType === "playlist") {
      const opts: Options = {
        height: "",
        width: "",
        playerVars: {
          list: videoId || undefined,
          listType: "playlist",
        },
      };
      const onPlaylistReady = (event: any) => {
        const fetchUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${videoId}&maxResults=1&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
        const { title } = event.target.getVideoData();
        if (title) {
          axios
            .get(fetchUrl)
            .then((response) => {
              setVideoTitle(response.data.items[0].snippet.title);
            })
            .catch((err) => {
              console.log(err);
              setVideoTitle("");
            });
        } else {
          setVideoTitle("");
        }
      };

      return (
        <ResPonsivePlayer>
          <Youtube onReady={onPlaylistReady} opts={opts} />
        </ResPonsivePlayer>
      );
    }

    return <></>;
  }
);

export const ResPonsivePlayer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  margin-bottom: 1rem;
  iframe {
    position: absolute;
    top: 0;
    right: 0;
    width: 100% !important;
    height: 100% !important;
  }
`;
