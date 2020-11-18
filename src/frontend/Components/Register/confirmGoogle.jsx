import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './scss/google.scss';
import { resetRegisterState } from '../../redux_actions/registerActions';

const ConfirmGoogle = ({ resetRegisterState }) => {
    return (
        <>
            <p>Konto założone!</p>
            <p> Możesz teraz się zalogować.</p>
            <Link className="button" to="/home" onClick={resetRegisterState} >Strona główna</Link>
        </>
    );
}

const mapStateToProps = (state) => ({
    registerData: state.registerData,
  });
  
  ConfirmGoogle.propTypes = {
    registerData: PropTypes.object
  }
  
  export default connect(mapStateToProps, { resetRegisterState })(ConfirmGoogle);