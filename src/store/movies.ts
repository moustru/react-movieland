import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import type { GetMoviesResponse, MovieType } from "@/types/Movies";

interface FiltersType {
  rating: string;
}

interface MoviesData {
  movies: MovieType[];
  relatedMovie: MovieType | null;
  isLoading: boolean;
  isError: boolean;
}

class MoviesStore {
  moviesData: MoviesData = {
    movies: [],
    relatedMovie: null,
    isLoading: false,
    isError: false,
  };
  filters: FiltersType = {
    rating: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  get filteredMovies() {
    return this.moviesData.movies.filter(
      (movie) => movie.vote_average > Number(this.filters.rating)
    );
  }

  setMovies = (movies: MovieType[]) => {
    this.moviesData.movies = movies;
  };

  setRelatedMovie = (movie: MovieType) => {
    this.moviesData.relatedMovie = movie;
  };

  getMovies = async () => {
    runInAction(() => {
      this.moviesData.isLoading = true;
    });

    try {
      const { data }: { data: GetMoviesResponse<MovieType[]> } =
        await axios.get("discover/movie", {
          params: {
            page: 1,
            sort_by: "popularity.desc",
          },
        });
      this.setMovies(data.results);
    } catch (error) {
      runInAction(() => {
        this.moviesData.isError = true;
      });
    } finally {
      runInAction(() => {
        this.moviesData.isLoading = false;
      });
    }
  };

  getRelatedMovie = async (movieId: string) => {
    try {
      const { data }: { data: MovieType } = await axios.get(`movie/${movieId}`);
      this.setRelatedMovie(data);
    } catch (error) {
      console.log(error);
    }
  };

  setFilters = (prop: string, value: string) => {
    this.filters = {
      ...this.filters,
      [prop]: value,
    };
  };
}

export const moviesStore = new MoviesStore();
