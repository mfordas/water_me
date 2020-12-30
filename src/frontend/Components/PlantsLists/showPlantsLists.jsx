import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getPlantsListsForUser } from '../../redux_actions/plantsListsActions';
import DeletePlantsList from './deletePlantsList';
import './scss/plantsLists.scss';

export const ShowPlantsLists = ({ getPlantsListsForUser, plantsListsData }) => {
  useEffect(() => {
    const getPlantsLists = async () => {
      await getPlantsListsForUser(localStorage.getItem('id'));
    };

    getPlantsLists();
  }, []);

  const generatePlantsLists = (plantsListsArray) => {
    return (
      <div
        className='plantsListsContainer'
        data-test='showPlantsListsComponent'
      >
        {plantsListsArray.map((plantsList) => {
          return (
            <div
              className='plantsListContainer'
              key={plantsList.id}
              data-test='plantsListContainer'
            >
              <div>{plantsList.name}</div>
              <Link to={`/plantsList/${plantsList.name}`}>Przejdź</Link>
              <DeletePlantsList plantsListId={plantsList.id} />
            </div>
          );
        })}
      </div>
    );
  };

  return <>{generatePlantsLists(plantsListsData.plantsLists)}</>;
};

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
});

ShowPlantsLists.propTypes = {
  plantsListsData: PropTypes.object,
};

export default connect(mapStateToProps, { getPlantsListsForUser })(
  ShowPlantsLists
);
