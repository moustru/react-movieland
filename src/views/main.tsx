import { Filters } from "@/components/Filters/Filters";
import { MovieList } from "@/components/MovieList/MovieList";

export default function MainPage() {
  return (
    <>
      {" "}
      <Filters />
      <MovieList />
    </>
  );
}
