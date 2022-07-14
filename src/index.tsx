import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./normalize.css";
import "./index.css";
import { DataProvider } from "./lib/context/Data";
import { BrowserRouter } from "react-router-dom";
import { StorageProvider } from "./lib/context/Storage";
import { ConfigProvider } from "./lib/context/Config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider>
      <DataProvider>
        <StorageProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StorageProvider>
      </DataProvider>
    </ConfigProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
