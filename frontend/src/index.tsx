import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import { Logo } from './Components/Logo/logo';
import { FooterComponent } from './Components/Footer';
import { MenuConnected } from './Components/Menu';

import { RoutesConnected as Routes } from './routes';

import { store } from './redux_store/reduxStore';

import './scss/main_styling.scss';

const App = () => {
    return (
        <Router>
            <div className='contentContainer'>
                <Logo />
                <MenuConnected />
                <Routes />
            </div>
            <FooterComponent />
        </Router>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
