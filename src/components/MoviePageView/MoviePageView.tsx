import { getRatingClass } from "@/helpers/rating";
import "./MoviePageView.css";
import type { MovieType } from "@/types/Movies";

export default function MoviePageView({
  title,
  original_title,
  tagline,
  poster_path,
  overview,
  vote_average,
  vote_count,
}: MovieType) {
  return (
    <div className="movie-page">
      <img
        src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${poster_path}`}
        alt="Poster"
      />
      <div className="movie-page__info">
        <h3 className="movie-page__info-title">{title}</h3>
        <p className="movie-page__info-text">{original_title}</p>
        <p className="movie-page__info-text">{tagline}</p>
        <div className={`rating ${getRatingClass(vote_average)}`}>
          {vote_average}
          <span className="movie-page__info-text movie-page__info-votes">
            (Кол-во оценок: {vote_count})
          </span>
        </div>
        <p className="movie-page__info-text">
          <p className="movie-page__info-text">Описание:</p>
          {overview}
        </p>
      </div>
    </div>
  );
}
