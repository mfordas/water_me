import { Route, Redirect } from 'react-router-dom';

import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../redux_reducers/';

const PublicRoute = ({
  component: Component,
  loginData,
  ...rest
}: PropsFromRedux | any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loginData.isLogged ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  loginData: state.loginData,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PublicRoute);
