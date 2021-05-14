import { Link } from 'react-router-dom';

import { ReactComponent as LogoPic } from '../../img/logo.svg';
import './scss/logo.scss';

export const Logo = () => {
    return (
        <div className='logo-container' data-test='logoComponent'>
            <Link to='/'><LogoPic data-test='logoSVG'/></Link>
        </div>
    );
}