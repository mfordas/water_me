import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { RootState } from '../../redux_reducers/';
import { LoginState } from '../../redux_actions/loginTypes';

import './scss/footer.scss';

export const Footer = ({ loginData }: { loginData: LoginState }) => {
  return (
    <footer>
      <div className='footerItem' data-test='footerComponent'>
        Copyright ©{' '}
        <a href='https://www.fordas.pl' data-test='linkInFooter'>
          Mateusz Fordas
        </a>{' '}
        {new Date().getFullYear()}
      </div>
      <div className='footerItem'>
        | Icons made by <a href='https://www.flaticon.com/authors/pixel-perfect' title='Pixel perfect'>Pixel perfect</a>
        from <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a>
      </div>
      {loginData.isLogged && <Link to='/userData/'>| Moje dane</Link>}
    </footer>
  );
};

const mapStateToProps = (state: RootState) => ({
  loginData: state.loginData,
});

const connector = connect(mapStateToProps);

export const FooterConnected = connector(Footer);
