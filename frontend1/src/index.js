import React from "react";
import ReactDOM from "react-dom/client"; // Import new ReactDOM API
import App from "./App";
import "./index.css";

// Use `createRoot` to render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);