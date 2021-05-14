import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import { Logo } from './Components/Logo/logo';
import { FooterComponent } from './Components/Footer';
import { MenuConnected } from './Components/Menu';

import { Routes } from './routes';

import { store } from './redux_store/reduxStore';

import './scss/main_styling.scss';

const App = () => {
    return (
        <BrowserRouter>
            <div className='contentContainer'>
                <Logo />
                <MenuConnected />
                <Routes />
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
