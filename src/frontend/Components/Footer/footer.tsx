import React from 'react';
import { Link } from 'react-router-dom';

import './scss/footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className='footerItem' data-test='footerComponent'>
        Copyright ©{' '}
        <a href='https://www.fordas.pl' data-test='linkInFooter'>
          Mateusz Fordas
        </a>{' '}
        {new Date().getFullYear()}
      </div>
      <Link to='/userData/'>| Moje dane</Link>
    </footer>
  );
};

export default Footer;
