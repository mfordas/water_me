import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import Logo from './Components/Logo/logo';
import FooterComponent from './Components/Footer';
import Menu from './Components/Menu';
import PublicRoute from './Components/PublicRoute';
import PrivateRoute from './Components/PrivateRoute';
import DeleteAccount from './Components/DeleteAccount/DeleteAccount';

import HomePage from './Views/HomePage';
import PlantsLists from './Views/PlantsLists';
import PlantsList from './Views/PlantsList';

import { store } from './redux_store/reduxStore';

import './scss/main_styling.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className='contentContainer'>
        <Logo />
        <Menu />
        <Switch>
          <PublicRoute exact path='/' component={HomePage} />
          <PrivateRoute exact path='/plantsLists' component={PlantsLists} />
          <PrivateRoute path='/plantsLists/' component={PlantsList} />
          <PrivateRoute path='/userData/' component={DeleteAccount} />
          <Route render={() => <Redirect to='/' />} />
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
  document.querySelector('#root')
);
