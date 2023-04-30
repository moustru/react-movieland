import { makeAutoObservable } from "mobx";
import axios from "axios";
import type { GetMoviesResponse, MovieType } from "@/types/Movies";

interface FiltersType {
  rating: string;
}

class MoviesStore {
  movies: MovieType[] = [];
  filters: FiltersType = {
    rating: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  get filteredMovies() {
    return this.movies.filter(
      (movie) => movie.vote_average > Number(this.filters.rating)
    );
  }

  setMovies = (movies: MovieType[]) => {
    this.movies = movies;
  };

  getMovies = async () => {
    const { data }: { data: GetMoviesResponse } = await axios.get("");

    this.setMovies(data.results);
  };

  setFilters = (prop: string, value: string) => {
    this.filters = {
      ...this.filters,
      [prop]: value,
    };
  };
}

export const moviesStore = new MoviesStore();
