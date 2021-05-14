import { Link } from 'react-router-dom';

import { connect, ConnectedProps } from 'react-redux';

import { resetRegisterState } from '../../redux_actions/registerActions';
import { RootState } from '../../redux_reducers/';

import './scss/google.scss';

export const ConfirmGoogle = ({ resetRegisterState }: PropsFromRedux) => {
    return (
        <>
            <p>Konto założone!</p>
            <p>Możesz teraz się zalogować.</p>
            <Link className='button' to='/home' onClick={resetRegisterState}>
        Strona główna
            </Link>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    registerData: state.registerData,
});

const mapDispatch = {
    resetRegisterState: resetRegisterState,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const ConfirmGoogleConnected = connector(ConfirmGoogle);
