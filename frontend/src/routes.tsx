import React, { useEffect } from 'react';

import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from './redux_reducers/';
import { getPlantsListsForUser } from './redux_actions/plantsListsActions';

import { PublicRouteConnected as PublicRoute } from './Components/PublicRoute';
import { PrivateRouteConnected as PrivateRoute } from './Components/PrivateRoute';
import { DeleteAccountConnected } from './Components/DeleteAccount/DeleteAccount';

import { HomePage } from './Views/HomePage';
import { PlantsListsComponent } from './Components/PlantsLists';
import { PlantsListConnected } from './Components/PlantsList/plantsList';
import { HOME_ROUTE, PLANTS_LISTS_ROUTE, USER_DATA_ROUTE } from './routesAddresses';

export const Routes = ({ getPlantsListsForUser, plantsListsData }: PropsFromRedux) => {
    useEffect(() => {
        const getPlantsLists = async () => {
            await getPlantsListsForUser();
        };

        getPlantsLists();
    }, []);

    return (
        <Switch>
            <PublicRoute exact={true} path={HOME_ROUTE} component={HomePage} />

            <PrivateRoute exact={true} path={PLANTS_LISTS_ROUTE} component={PlantsListsComponent} />
            {plantsListsData.plantsLists.map((list, index) => (
                <PrivateRoute
                    key={index}
                    exact={true}
                    path={`${PLANTS_LISTS_ROUTE}${list.name}`}
                    component={PlantsListConnected}
                    listIndex={index}
                />
            ))}
            <PrivateRoute path={USER_DATA_ROUTE} component={DeleteAccountConnected} />

            <Route render={() => <Redirect to={HOME_ROUTE} />} />
        </Switch>
    );
};

const mapStateToProps = (state: RootState) => ({
    plantsListsData: state.plantsListsData,
});

const mapDispatch = {
    getPlantsListsForUser: getPlantsListsForUser,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const RoutesConnected = connector(Routes);
