import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>,
    rootElement
  );
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  );
}

reportWebVitals();
