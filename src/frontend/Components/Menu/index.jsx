import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../redux_actions/loginActions';

import './scss/menu.scss';

export const Menu = ({loginData, logout}) => {

    return ( <div className="containerMenu">
    {!loginData.isLogged &&
        (
            <>
            </>
        )
        }
    {loginData.isLogged &&
    (
        <>
        <NavLink className="buttonMenu" to="/plantsLists">Moje listy rośliny</NavLink>
        <button className="buttonMenu" onClick={() => logout()}>Wyloguj</button>
        </>
    )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    loginData: state.loginData,
  });
  
  Menu.propTypes = {
    loginData: PropTypes.shape({
        loginData: PropTypes.shape({
            name: PropTypes.string,
            googleId: PropTypes.string,
            invalidData: PropTypes.bool
        }),
        isLogged: PropTypes.bool,
    }),
    logout: PropTypes.func
  }
  
  export default connect(mapStateToProps, { logout })(Menu);
