import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LogoComponent from "./frontend/Components/Logo"
import FooterComponent from "./frontend/Components/Footer";
import RegisterComponent from './frontend/Components/Register';
import HomePage from './frontend/Views/HomePage';


import './frontend/scss/main_styling.scss';

const App = () => {

  return (
    <BrowserRouter>
    <div className="contentContainer">
      <LogoComponent />
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/register" component={RegisterComponent} />
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