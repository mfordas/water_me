import { Redirect } from 'react-router-dom';

import { connect, ConnectedProps } from 'react-redux';

import { deleteAccount } from '../../redux_actions/loginActions';
import { RootState } from '../../redux_reducers/';
import { HOME_ROUTE } from '../../routesAddresses';

import './scss/deleteAccount.scss';

export const DeleteAccount = ({ deleteAccount, loginData }: PropsFromRedux): JSX.Element => {
    return loginData.isLogged ? (
        <div className='deleteAccount' data-test='deleteAccountContainer'>
            <div className='personalDataContainer'>
                <p>Dane, które przechowujemy:</p>
                <p>
                    <span>Google id:</span> {loginData.loginData.googleId}
                </p>
                <p>
                    <span>Imię:</span> {loginData.loginData.name}
                </p>
            </div>
            <p>
                W każdej chwili możesz usunąć swoje konto. Pamiętaj, że nie będzie można
                cofnąć tej operacji a wszystkie listy roślin oraz rośliny zostaną
                usunięte.
            </p>
            <button
                className='deleteAccountButton'
                data-test='deleteAccountButton'
                onClick={deleteAccount}
            >
                Usuń konto
            </button>
        </div>
    ) : (
        <Redirect to={HOME_ROUTE} />
    );
};

const mapStateToProps = (state: RootState) => ({
    loginData: state.loginData,
});

const mapDispatch = {
    deleteAccount: deleteAccount,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const DeleteAccountConnected = connector(DeleteAccount);
