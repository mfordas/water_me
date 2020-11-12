import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import HomePage from "./frontend/Views/HomePage";


import './frontend/scss/main_styling.scss';

const App = () => {

  return (
    <BrowserRouter>
    <div className="contentContainer">
      <Route exact path="/" component={HomePage} />
      <Route render={() => <Redirect to="/" />} />
      </div>
      </BrowserRouter>
  );
};

ReactDOM.render(
    <App />,
  document.querySelector("#root")
);