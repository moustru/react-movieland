import { types, flow, Instance, cast, getRoot } from "mobx-state-tree";
import axios from "axios";
import type { GetMoviesResponse } from "@/types/Movies";

type MovieModelType = Instance<typeof MovieModel>;

const {
  string: MSTString,
  number: MSTNumber,
  boolean: MSTBoolean,
  identifierNumber,
  array,
  optional,
  maybe,
  maybeNull,
  model,
} = types;

const MovieGenreModel = model("MovieGenre", {
  id: MSTNumber,
  name: MSTString,
});

const MovieModel = model("Movie", {
  id: identifierNumber,
  title: MSTString,
  original_title: MSTString,
  tagline: maybe(MSTString),
  budget: maybe(MSTNumber),
  overview: MSTString,
  adult: MSTBoolean,
  poster_path: MSTString,
  vote_average: MSTNumber,
  vote_count: MSTNumber,
  genres: array(MovieGenreModel),
});

const MoviesDataModel = types.model("MoviesData", {
  movies: optional(array(MovieModel), []),
  relatedMovie: maybeNull(MovieModel),
  isLoading: MSTBoolean,
  isError: MSTBoolean,
});

const FiltersModel = types.model("Filters", {
  rating: MSTString,
});

const MovieStore = types
  .model("MovieStore", {
    moviesData: MoviesDataModel,
    filters: FiltersModel,
  })
  .views((self) => {
    return {
      get filteredMovies() {
        return self.moviesData.movies.filter(
          (movie) => movie.vote_average >= Number(self.filters.rating)
        );
      },
    };
  })
  .actions((self) => {
    const root = getRoot<typeof MovieStore>(self);

    const setMovies = (movies: MovieModelType[]) => {
      self.moviesData.movies = cast(movies);
    };

    const setRelatedMovie = (movie: MovieModelType | null) => {
      self.moviesData.relatedMovie = movie;
    };

    const setFilters = (prop: string, value: string) => {
      self.filters = {
        ...self.filters,
        [prop]: value,
      };
    };

    const getMovies = flow(function* () {
      self.moviesData.isLoading = true;

      try {
        const { data }: { data: GetMoviesResponse<MovieModelType[]> } =
          yield axios.get("discover/movie", {
            params: {
              page: 1,
              sort_by: "popularity.desc",
            },
          });

        root.setMovies(data.results);
      } catch (error) {
        self.moviesData.isError = true;
        console.log(error);
      } finally {
        self.moviesData.isLoading = false;
      }

      return self.moviesData.movies;
    });

    const getRelatedMovie = flow(function* (movieId: string) {
      root.setRelatedMovie(null);

      try {
        const { data }: { data: MovieModelType } = yield axios.get(
          `movie/${movieId}`
        );

        root.setRelatedMovie(data);
      } catch (error) {
        console.log(error);
      }

      return self.moviesData.relatedMovie;
    });

    return {
      setMovies,
      setRelatedMovie,
      getMovies,
      getRelatedMovie,
      setFilters,
    };
  });

export const MovieStoreInstance = MovieStore.create({
  moviesData: {
    movies: [],
    relatedMovie: null,
    isLoading: false,
    isError: false,
  },
  filters: {
    rating: "",
  },
});
