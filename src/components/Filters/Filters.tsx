import "./Filters.css";
import { ChangeEvent, FC, useState } from "react";
import { observer } from "mobx-react-lite";
import useStore from "@/hooks/useStore";

export const FiltersComponent: FC = () => {
  const [rating, setRating] = useState("");
  const moviesStore = useStore();

  const filterByRating = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
    moviesStore.setFilters("rating", e.target.value);
  };

  return (
    <div className="filters">
      <input
        value={rating}
        onInput={filterByRating}
        type="number"
        placeholder="Рейтинг, от"
        className="input"
      />
    </div>
  );
};

export const Filters = observer(FiltersComponent);
