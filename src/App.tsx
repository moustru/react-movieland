import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export default function AppComponent() {
  return (
    <div className="content">
      <h1 className="content__title">Movieland</h1>
      <RouterProvider router={router} />
    </div>
  );
}
