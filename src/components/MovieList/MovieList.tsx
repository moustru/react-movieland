import "./MovieList.css";
import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { moviesStore } from "@/store/movies";
import Movie from "../Movie/Movie";

const MovieListComponent: FC = () => {
  useEffect(() => {
    moviesStore.getMovies();
  }, []);

  if (!moviesStore.filteredMovies.length)
    return <div className="no-data">Нет данных</div>;

  return (
    <div className="movies">
      {moviesStore.filteredMovies.map((movie, index) => (
        <Movie {...movie} key={index} />
      ))}
    </div>
  );
};

export const MovieList = observer(MovieListComponent);
