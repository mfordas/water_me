import React from 'react';

import './scss/flower.scss';
import { ReactComponent as FlowerPic } from '../../img/flower.svg';

// <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>


const Flower = () => {
        return (
                <div className="mainScreenContainer">
                    <FlowerPic />
                </div>
        );
}

export default Flower;







