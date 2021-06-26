import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';

import { Logo } from './Components/Logo/logo';
import { FooterConnected as Footer } from './Components/Footer/footer';
import { MenuConnected as Menu } from './Components/Menu/menu';

import { Routes } from './routes';

import { store } from './redux_store/reduxStore';

import './scss/main_styling.scss';

const App = () => {
    return (
        <Router>
            <div className='contentContainer'>
                <Logo />
                <Menu />
                <Routes />
            </div>
            <Footer />
        </Router>
    );
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
