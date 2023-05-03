/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useLocation } from "react-router-dom";
import { useEffect, FC } from "react";
import { observer } from "mobx-react-lite";
import MoviePageView from "@/components/MoviePageView/MoviePageView";
import useStore from "@/hooks/useStore";

const MoviePageComponent: FC = () => {
  const moviesStore = useStore();
  const location = useLocation();
  const movie = moviesStore.moviesData.relatedMovie!;

  useEffect(() => {
    moviesStore.getRelatedMovie(location.state.id);
  }, [location.state.id, moviesStore]);

  if (!moviesStore.moviesData.relatedMovie) return <h3>Загрузка...</h3>;

  return <MoviePageView {...movie} />;
};

export const MoviePage = observer(MoviePageComponent);
