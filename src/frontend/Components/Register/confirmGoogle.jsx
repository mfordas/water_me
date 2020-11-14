import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './scss/google.scss';
import { resetRegisterState } from '../../redux_actions/registerActions';

class ConfirmGoogle extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: this.props.name,
            email: this.props.email,
        }
    }

    render() {
        return (
            <div className="container">
                <div className="registerCard">
                    <p>Konto założone! Możesz teraz się zalogować.</p>
                    <form>
                    <NavLink className="button" to="/home" onClick={() => this.props.resetRegisterState()}>Strona główna</NavLink>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    registerData: state.registerData,
  });
  
  ConfirmGoogle.propTypes = {
    registerData: PropTypes.object
  };
  
  export default connect(mapStateToProps, { resetRegisterState })(ConfirmGoogle);