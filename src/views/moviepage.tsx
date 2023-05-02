/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useLocation } from "react-router-dom";
import { moviesStore } from "@/store/movies";
import { useEffect, FC } from "react";
import { observer } from "mobx-react-lite";
import MoviePageView from "@/components/MoviePageView/MoviePageView";

const MoviePageComponent: FC = () => {
  const location = useLocation();
  const movie = moviesStore.moviesData.relatedMovie!;

  useEffect(() => {
    moviesStore.getRelatedMovie(location.state.id);
  }, []);

  if (!moviesStore.moviesData.relatedMovie) return <h3>Загрузка...</h3>;

  return <MoviePageView {...movie} />;
};

export const MoviePage = observer(MoviePageComponent);
