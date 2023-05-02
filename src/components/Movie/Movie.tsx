import type { MovieType } from "@/types/Movies";
import "./Movie.css";
import { getRatingClass } from "@/helpers/rating";

export default function Movie({
  title,
  poster_path,
  vote_average,
  adult,
}: MovieType) {
  return (
    <div className="movie">
      <img
        className="movie__img"
        src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${poster_path}`}
        alt="Movie poster"
      />
      <div className="movie__info">
        <span className={`rating ${getRatingClass(vote_average)}`}>
          {vote_average}
        </span>
        {adult && <span className="movie__adult">18+</span>}
      </div>
      <p className="movie__title">{title}</p>
    </div>
  );
}
