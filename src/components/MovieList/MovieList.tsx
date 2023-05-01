import "./MovieList.css";
import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { moviesStore } from "@/store/movies";
import Movie from "../Movie/Movie";
import { Link } from "react-router-dom";

const MovieListComponent: FC = () => {
  useEffect(() => {
    moviesStore.getMovies();
  }, []);

  if (moviesStore.moviesData.isLoading)
    return <div className="no-data">Загрузка...</div>;

  if (moviesStore.moviesData.isError)
    return <div className="no-data">Ошибка загрузки</div>;

  if (!moviesStore.filteredMovies.length)
    return <div className="no-data">Нет данных</div>;

  return (
    <div className="movies">
      {moviesStore.filteredMovies.map((movie, index) => (
        <Link to={`/movie/${movie.id}`} key={index} state={{ id: movie.id }}>
          <Movie {...movie} />
        </Link>
      ))}
    </div>
  );
};

export const MovieList = observer(MovieListComponent);
