import { Route, Redirect } from 'react-router-dom';

import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../redux_reducers/';

const PrivateRoute = ({
  component: Component,
  loginData,
  match,
  ...rest
}: PropsFromRedux | any) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loginData.isLogged ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  loginData: state.loginData,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const PrivateRouteConnected = connector(PrivateRoute);
