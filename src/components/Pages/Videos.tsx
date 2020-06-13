import React, { FC, useContext, useEffect, useState, useMemo } from "react";
import { PaginationProps, Dropdown, DropdownProps } from "semantic-ui-react";
import queryString from "query-string";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { Loading } from "components/Common/Loading";
import { SideMenuContext, TagsContext } from "context";
import styled from "styled-components";
import { AppUser } from "types/AppUser";
import { Video } from "types/Video";
import { PaginationVideos } from "./Mypage/PaginationVideos";

type VideosProps = {
  user: AppUser;
  videos: Video[];
  videosLoading: boolean;
};

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 1em;
`;

const videoPerPage = 4;

export const Videos: FC<VideosProps> = ({ user, videos, videosLoading }) => {
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [filterdVideos, setFilteredVideos] = useState<Video[]>(videos);
  const { setMenuLocation } = useContext(SideMenuContext);
  const [activePage, setActivePage] = useState<number>(1);
  const { tags } = useContext(TagsContext);
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
    if (filterTag) {
      setFilteredVideos(
        videos.filter((video) => {
          return video.tags.includes(filterTag);
        })
      );
    } else {
      setFilteredVideos(videos);
    }
  }, [filterTag, videos]);

  useEffect(() => {
    const page = queryString.parse(location.search).page as string | undefined;
    setActivePage(page ? Number(page) : 1);
    const tagLabel = decodeURI(location.hash.substr(1));
    if (tagLabel) {
      setFilterTag(tagLabel);
    }
  }, [location, tags]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const pageVideos = useMemo(() => {
    const topVideoIndex = (activePage - 1) * videoPerPage;

    return filterdVideos.slice(topVideoIndex, topVideoIndex + videoPerPage);
  }, [activePage, filterdVideos]);

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => {
    history.push(`${match.url}?page=${data.activePage}`);
  };

  const handleFilterChange = (
    e: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => {
    setFilterTag((value as string) || "");
    history.push(match.url);
  };

  if (videosLoading) {
    return <Loading />;
  }

  return (
    <>
      <StyledDropdown
        clearable
        options={tags.map((tag) => ({ value: tag.label, text: tag.label }))}
        selection
        placeholder="タグで絞り込む"
        value={filterTag}
        onChange={handleFilterChange}
      />
      <PaginationVideos
        user={user}
        videos={pageVideos}
        activePage={activePage}
        handlePageChange={handlePageChange}
        totalPages={Math.ceil(filterdVideos.length / videoPerPage)}
      />
    </>
  );
};
