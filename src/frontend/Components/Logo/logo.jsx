import React from 'react';
import { Link } from 'react-router-dom';
import './scss/logo.scss';

import { ReactComponent as LogoPic } from '../../img/logo.svg';

// <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>


const Logo = () => {
        return (
                <div className="logo-container" data-test="logoComponent">
                    <Link to="/"><LogoPic data-test='logoSVG'/></Link>
                </div>
        );
}

export default Logo;







