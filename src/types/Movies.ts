type MovieGenre = {
  id: number;
  name: string;
};

export type GetMoviesResponse<T> = {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
};

export type MovieType = {
  id: number;
  title: string;
  original_title: string;
  tagline: string | undefined;
  budget: number | undefined;
  overview: string;
  adult: boolean;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  genres: MovieGenre[];
};
