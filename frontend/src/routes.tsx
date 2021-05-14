import { Route, Redirect, Switch } from 'react-router-dom';

import { PublicRouteConnected as PublicRoute } from './Components/PublicRoute';
import { PrivateRouteConnected as PrivateRoute } from './Components/PrivateRoute';
import { DeleteAccountConnected } from './Components/DeleteAccount/DeleteAccount';

import { HomePage } from './Views/HomePage';
import { PlantsListsComponent } from './Components/PlantsLists';
import { PlantsListConnected } from './Components/PlantsList/plantsList';

export const Routes = () => {
    return (
        <Switch>
            <PublicRoute exact={true} path='/' component={HomePage} />

            <PrivateRoute exact={true} path='/plantsLists/' component={PlantsListsComponent} />
            <PrivateRoute path='/plantsLists/:name' component={PlantsListConnected} />
            <PrivateRoute path='/userData/' component={DeleteAccountConnected} />

            <Route render={() => <Redirect to='/' />} />
        </Switch>
    );
}
