import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { logout } from '../../redux_actions/loginActions';
import { RootState } from '../../redux_reducers/';

import './scss/menu.scss';

export const Menu = ({ loginData, logout }: PropsFromRedux) => {
  return (
    <div className='containerMenu' data-test='menuComponent'>
      {!loginData.isLogged && <div data-test='noElementsInMenuComponent'></div>}
      {loginData.isLogged && (
        <div data-test='menuComponentVisible'>
          <NavLink className='buttonMenu' to='/plantsLists'>
            Moje listy rośliny
          </NavLink>
          <button className='buttonMenu' onClick={() => logout()}>
            Wyloguj
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loginData: state.loginData,
});

const mapDispatch = {
  logout: logout,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Menu);
