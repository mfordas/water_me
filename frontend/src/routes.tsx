import React, { useEffect } from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import { PublicRouteConnected as PublicRoute } from './Components/PublicRoute';
import { PrivateRouteConnected as PrivateRoute } from './Components/PrivateRoute';
import { DeleteAccountConnected } from './Components/DeleteAccount/DeleteAccount';

import { HomePage } from './Views/HomePage';
import { PlantsListsComponent } from './Components/PlantsLists';
import { PlantsListConnected } from './Components/PlantsList/plantsList';
import { HOME_ROUTE, PLANTS_LISTS_ROUTE, USER_DATA_ROUTE, PLANTS_LIST_ROUTE } from './routesAddresses';

export const Routes = () => {
    return (
        <Switch>
            <PublicRoute exact={true} path={HOME_ROUTE} component={HomePage} />

            <PrivateRoute exact={true} path={PLANTS_LISTS_ROUTE} component={PlantsListsComponent} />
            <PrivateRoute
                exact={true}
                path={PLANTS_LIST_ROUTE}
                component={PlantsListConnected}
            />
            <PrivateRoute path={USER_DATA_ROUTE} component={DeleteAccountConnected} />
            <Route render={() => <Redirect to={HOME_ROUTE} />} />
        </Switch>
    );
};
