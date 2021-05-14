import { Link } from 'react-router-dom';

import { HOME_ROUTE } from '../../routesAddresses';

import { ReactComponent as LogoPic } from '../../img/logo.svg';

import './scss/logo.scss';

export const Logo = () => {
    return (
        <div className='logo-container' data-test='logoComponent'>
            <Link to={HOME_ROUTE}>
                <LogoPic data-test='logoSVG'/>
            </Link>
        </div>
    );
};
