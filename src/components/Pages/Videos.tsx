import React, { FC, useContext, useEffect, useState, useMemo } from "react";
import {
  Grid,
  Button,
  Segment,
  Pagination,
  PaginationProps,
} from "semantic-ui-react";
import queryString from "query-string";
import { useVideos } from "utils/useVideos";
import { Link, useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { Loading } from "components/Common/Loading";
import { SideMenuContext } from "context";
// import { Comment } from "components/Pages/Mypage/Video/Video";
import styled from "styled-components";
import { VideoView } from "./VideoView";

type VideosProps = {
  uid: string;
};

const Comment = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2em;
`;

const FlexSegment = styled(Segment)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition-duration: 0.3s;

  p {
    margin: 1em 0;
  }
  :hover {
    box-shadow: 0 2px 8px #bbb;
  }
`;

// TODO: なんかレンダリング多い
export const Videos: FC<VideosProps> = ({ uid }) => {
  const { videos, loading } = useVideos(uid);
  const { setMenuLocation } = useContext(SideMenuContext);
  const [activePage, setActivePage] = useState<number>(1);
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setMenuLocation("videos");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  useEffect(() => {
    const page = queryString.parse(location.search).page as string | undefined;
    setActivePage(page ? Number(page) : 1);
  }, [location]);

  const pageVideos = useMemo(() => {
    const topVideoIndex = (activePage - 1) * 4;

    return videos.slice(topVideoIndex, topVideoIndex + 4);
  }, [activePage, videos]);

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => {
    history.push(`${match.url}?page=${data.activePage}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Grid>
        {pageVideos.map((video) => {
          return (
            <Grid.Column
              key={video.id}
              textAlign="center"
              mobile={16}
              tablet={8}
              computer={8}
            >
              <Link to={`${match.url}/${video.id}`}>
                <FlexSegment>
                  <VideoView
                    videoId={video.videoId}
                    videoType={video.type}
                    // size="small"
                  />
                  <Comment>{video.comment}</Comment>
                  {/* <Button fluid icon="arrow right" /> */}
                </FlexSegment>
              </Link>
            </Grid.Column>
          );
        })}
      </Grid>
      <PaginationWrapper>
        <Pagination
          totalPages={Math.ceil(videos.length / 4)}
          activePage={activePage}
          onPageChange={handlePageChange}
        />
      </PaginationWrapper>
    </>
  );
};
