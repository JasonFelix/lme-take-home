// eslint-disable-next-line no-use-before-define
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Area from "./models/Area";

const area: Area = new Area({ width: 0, height: 0 }, { width: 50, height: 50 });

ReactDOM.render(
  <React.StrictMode>
    <App area={area} />
  </React.StrictMode>,
  document.getElementById("root")
);
