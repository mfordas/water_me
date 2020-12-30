import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deletePlant } from '../../redux_actions/plantsActions';
import { showPlantsList } from '../../redux_actions/plantsListsActions';
import './scss/plantsList.scss';

const DeletePlant = ({ deletePlant, showPlantsList, plantId, listId }) => {
  const handleDeletePlant = async () => {
    const userId = localStorage.getItem('id');

    await deletePlant(userId, plantId);
    await showPlantsList(userId, listId);
  };

  return (
    <div>
      <button className='deleteButton' onClick={handleDeletePlant}>
        Usuń
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  plantsData: state.plantsData,
});

DeletePlant.propTypes = {
  plantsData: PropTypes.object,
};

export default connect(mapStateToProps, { deletePlant, showPlantsList })(
  DeletePlant
);
