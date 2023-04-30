import { ChangeEvent, FC, useState } from "react";
import "./App.css";
import { observer } from "mobx-react-lite";
import { MovieList } from "./components/MovieList/MovieList";
import { moviesStore } from "./store/movies";

const AppComponent: FC = () => {
  const [rating, setRating] = useState("");

  const filterByRating = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
    moviesStore.setFilters("rating", e.target.value);
  };

  return (
    <div className="content">
      <h1 className="content__title">Movieland</h1>
      <div className="content__filters">
        <input value={rating} onInput={filterByRating} />
      </div>
      <MovieList />
    </div>
  );
};

export const App = observer(AppComponent);
