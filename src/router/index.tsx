import ErrorPage from "@/views/error";
import MainPage from "@/views/main";
import { MoviePage } from "@/views/moviepage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/movie/:id",
    element: <MoviePage />,
  },
]);
