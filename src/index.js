import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LogoComponent from "./frontend/Components/Logo"
import FooterComponent from "./frontend/Components/Footer";

import HomePage from './frontend/Views/HomePage';


import './frontend/scss/main_styling.scss';

const App = () => {

  return (
    <BrowserRouter>
    <div className="contentContainer">
      <LogoComponent />
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route render={() => <Redirect to="/" />} />
      </Switch>
      <FooterComponent />
      </div>
      </BrowserRouter>
  );
};

ReactDOM.render(
    <App />,
  document.querySelector("#root")
);