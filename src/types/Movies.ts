export type GetMoviesResponse = {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
};

export type MovieType = {
  id: number;
  title: string;
  overview: string;
  adult: boolean;
  poster_path: string;
  vote_average: number;
};
