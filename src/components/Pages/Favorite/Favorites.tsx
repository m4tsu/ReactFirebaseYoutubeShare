import React, { FC, useState, useEffect, useContext } from "react";
import { AppUser } from "types/AppUser";
import { Grid, PaginationProps } from "semantic-ui-react";
import queryString from "query-string";
import { SideMenuContext } from "context";
import { useLocation, useRouteMatch, useHistory } from "react-router-dom";
import { PaginationVideos } from "components/Pages/Mypage/PaginationVideos";
import { useLikeVideos } from "utils/useLikeVideos";
import { Loading } from "components/Common/Loading";

type FavoritesProps = {
  user: AppUser;
};

const videoPerPage = 4;

export const Favorites: FC<FavoritesProps> = ({ user }) => {
  const [activePage, setActivePage] = useState<number>(1);
  const { setMenuLocation } = useContext(SideMenuContext);
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const { pageVideos, loading, totalVideoNumber } = useLikeVideos({
    user,
    activePage,
    videoPerPage,
  });

  useEffect(() => {
    setMenuLocation("favorites");

    return () => {
      setMenuLocation("other");
    };
  }, [setMenuLocation]);

  useEffect(() => {
    const page = queryString.parse(location.search).page as string | undefined;
    setActivePage(page ? Number(page) : 1);
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => {
    history.push(`${match.url}?page=${data.activePage}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <PaginationVideos
          user={user}
          videos={pageVideos}
          activePage={activePage}
          handlePageChange={handlePageChange}
          totalPages={Math.ceil(totalVideoNumber / videoPerPage)}
          withUser
        />
      )}
    </>
  );
};
