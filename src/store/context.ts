import { createContext } from "react";
import { MovieStoreInstance } from "./moviesStore";

const StoreContext = createContext(MovieStoreInstance);

export default StoreContext;
