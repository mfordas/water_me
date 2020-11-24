import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../redux_actions/loginActions';

import './scss/menu.scss';

const Menu = ({loginData, logout}) => {

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
        <NavLink className="buttonMenu" to="/plants">Moje rośliny</NavLink>
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
    loginData: PropTypes.object
  }
  
  export default connect(mapStateToProps, { logout })(Menu);
