import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./interceptor";
import { MovieStoreInstance } from "./store/moviesStore.ts";
import StoreContext from "./store/context.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StoreContext.Provider value={MovieStoreInstance}>
    <App />
  </StoreContext.Provider>
);
