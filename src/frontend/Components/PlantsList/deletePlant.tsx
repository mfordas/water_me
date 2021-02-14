import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { deletePlant } from '../../redux_actions/plantsActions';
import { showPlantsList } from '../../redux_actions/plantsListsActions';
import { RootState } from '../../redux_reducers/';
import './scss/plantsList.scss';
import { DeletePlantProps } from './plantsList';

const DeletePlant = ({
  deletePlant,
  showPlantsList,
  plantId,
  listId,
}: PropsFromRedux) => {
  const handleDeletePlant = async () => {
    const userId = localStorage.getItem('id');
    if (userId) {
      await deletePlant(userId, plantId);
      await showPlantsList(userId, listId);
    } else {
      console.error('User id not found');
    }
  };

  return (
    <div>
      <button className='deleteButton' onClick={handleDeletePlant}>
        Usuń
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState, ownProps: DeletePlantProps) => ({
  plantsData: state.plantsData,
  plantId: ownProps.plantId,
  listId: ownProps.listId,
});

const mapDispatch = {
  deletePlant: deletePlant,
  showPlantsList: showPlantsList,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DeletePlant);
