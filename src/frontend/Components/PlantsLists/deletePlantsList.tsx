import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  deletePlantsList,
  getPlantsListsForUser,
} from '../../redux_actions/plantsListsActions';
import { RootState } from '../../redux_reducers/';
import './scss/plantsLists.scss';

export const DeletePlantsList = ({
  deletePlantsList,
  getPlantsListsForUser,
  plantsListsData,
  plantsListId,
}: PropsFromRedux) => {
  const handlerDeletePlantsList = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const id = localStorage.getItem('id');
    if (id) {
      await deletePlantsList(id, plantsListId);
      await getPlantsListsForUser(id);
    } else {
      console.error('User id not found');
    }
  };

  return (
    <button
      className='deleteButton'
      onClick={(e) => handlerDeletePlantsList(e)}
      data-test='deletePlantListComponent'
    >
      Usuń
    </button>
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: { plantsListId: number }
) => ({
  plantsListsData: state.plantsListsData,
  plantsData: state.plantsData,
  plantsListId: ownProps.plantsListId,
});

const mapDispatch = {
  deletePlantsList: deletePlantsList,
  getPlantsListsForUser: getPlantsListsForUser,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DeletePlantsList);
