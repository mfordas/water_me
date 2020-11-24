import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import LogoComponent from "./frontend/Components/Logo"
import FooterComponent from "./frontend/Components/Footer";
import FlowerComponent from "./frontend/Components/Flower";
import Menu from './frontend/Components/Menu';
import PublicRoute from './frontend/Components/PublicRoute';
import PrivateRoute from './frontend/Components/PrivateRoute';
import { store } from './frontend/redux_store/reduxStore'

import HomePage from './frontend/Views/HomePage';


import './frontend/scss/main_styling.scss';

const App = () => {

  return (
    <BrowserRouter>
    <div className="contentContainer">
      <LogoComponent />
      <Menu />
      <Switch>
      <PublicRoute exact path="/" component={HomePage} />
      <PrivateRoute exact path="/plants" component={FlowerComponent} />
      <Route render={() => <Redirect to="/" />} /> 
      </Switch>
      </div>
      <FooterComponent />
      </BrowserRouter>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.querySelector("#root")
);