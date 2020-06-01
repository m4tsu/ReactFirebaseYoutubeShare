import React, { FC, useContext, useEffect, useState, useMemo } from "react";
import { PaginationProps, Dropdown, DropdownProps } from "semantic-ui-react";
import queryString from "query-string";
import { useVideos } from "utils/useVideos";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";
import { Loading } from "components/Common/Loading";
import { SideMenuContext, TagsContext } from "context";
import styled from "styled-components";
import { AppUser } from "types/AppUser";
import { PaginationVideos } from "./Mypage/PaginationVideos";

type VideosProps = {
  user: AppUser;
};

const StyledDropdown = styled(Dropdown)`
  margin-bottom: 1.5em;
`;

const videoPerPage = 4;

export const Videos: FC<VideosProps> = ({ user }) => {
  const [filterTag, setFilterTag] = useState<string>("");
  const { videos, loading } = useVideos({ user, filterTag });
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
    const page = queryString.parse(location.search).page as string | undefined;
    setActivePage(page ? Number(page) : 1);
    const tagLabel = decodeURI(location.hash.substr(1));
    if (tagLabel) {
      setFilterTag(tags.some((tag) => tag.label === tagLabel) ? tagLabel : "");
    }
  }, [location, tags]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const pageVideos = useMemo(() => {
    const topVideoIndex = (activePage - 1) * videoPerPage;

    return videos.slice(topVideoIndex, topVideoIndex + videoPerPage);
  }, [activePage, videos]);

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

  if (loading) {
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
        totalPages={Math.ceil(videos.length / videoPerPage)}
      />
    </>
  );
};
