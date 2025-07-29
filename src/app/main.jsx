import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "../app/style/index.css";
import App from "../app/App.jsx";
import "../../i18n.js";

import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { AppStateProvider } from "../pages/useContext/AppStateContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={"loading..."}>
        <Provider store={store}>
          <AppStateProvider>
            <App />
          </AppStateProvider>
        </Provider>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
