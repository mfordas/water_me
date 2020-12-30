import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PlantsList from './plantsList';
import { getPlantsListsForUser } from '../../redux_actions/plantsListsActions';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';

const PlantsListComponent = ({
  getPlantsListsForUser,
  plantsListsData,
  match,
}) => {
  useEffect(() => {
    const getPlantsLists = async () => {
      await getPlantsListsForUser(localStorage.getItem('id'));
    };

    getPlantsLists();
  }, []);

  return (
    <Switch>
      {plantsListsData.plantsLists.map((list, index) => (
        <PrivateRoute
          key={index}
          exact
          path={`/plantsList/${list.name}`}
          component={PlantsList}
          listIndex={index}
        />
      ))}
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
});

PlantsListComponent.propTypes = {
  plantsListsData: PropTypes.object,
};

export default connect(mapStateToProps, { getPlantsListsForUser })(
  PlantsListComponent
);
