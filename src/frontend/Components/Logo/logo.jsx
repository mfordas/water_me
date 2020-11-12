import React from 'react';
import './scss/logo.scss';

import { ReactComponent as LogoPic } from '../../img/logo.svg';

// <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>


const Logo = () => {
        return (
                <div className="logo-container">
                    <LogoPic />
                </div>
        );
}

export default Logo;







