import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./App/RootRouter";

import { Provider as StoreProvider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreProvider store={store}>
    <RouterProvider router={router} />
  </StoreProvider>
);
