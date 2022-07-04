import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./normalize.css";
import "./index.css";
import { DataProvider } from "./lib/context/Schedule";
import { BrowserRouter } from "react-router-dom";
import { LikesProvider } from "./lib/context/Likes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataProvider>
      <LikesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LikesProvider>
    </DataProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
