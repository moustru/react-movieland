/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useLocation } from "react-router-dom";
import { moviesStore } from "@/store/movies";
import { useEffect, FC } from "react";
import { observer } from "mobx-react-lite";

const MoviePageComponent: FC = () => {
  const location = useLocation();
  const movie = moviesStore.moviesData.relatedMovie;

  useEffect(() => {
    moviesStore.getRelatedMovie(location.state.id);
  }, []);

  if (!moviesStore.moviesData.relatedMovie) return <h3>Загрузка...</h3>;

  return (
    <div className="movie-page">
      <img
        src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie?.poster_path}`}
        alt="Poster"
      />
      <div className="movie-page__info">
        <h3>{movie?.title}</h3>
        <p>{movie?.original_title}</p>
        <p>{movie?.tagline}</p>
      </div>
    </div>
  );
};

export const MoviePage = observer(MoviePageComponent);
