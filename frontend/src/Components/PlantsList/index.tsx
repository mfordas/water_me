import React, { useEffect } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { PlantsListConnected } from './plantsList';
import { getPlantsListsForUser } from '../../redux_actions/plantsListsActions';
import { Switch } from 'react-router-dom';
import { PrivateRouteConnected as PrivateRoute } from '../PrivateRoute';
import { RootState } from '../../redux_reducers/';

export const PlantsListComponent = ({
  getPlantsListsForUser,
  plantsListsData,
}: PropsFromRedux) => {
  useEffect(() => {
    const getPlantsLists = async () => {
      await getPlantsListsForUser();
    };

    getPlantsLists();
  }, []);

  return (
    <Switch>
      {plantsListsData.plantsLists.map((list, index) => (
        <PrivateRoute
            key={index}
            exact={true}
            path={`/plantsLists/${list.name}`}
            component={PlantsListConnected}
            listIndex={index}
        />
      ))}
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

export const PlantsListComponentConnected = connector(PlantsListComponent);
