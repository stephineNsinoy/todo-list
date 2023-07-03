import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "material-icons/iconfont/material-icons.css";
import "./styles/normalize.scss";
import { configureAxios } from "./configureAxios";

configureAxios();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
