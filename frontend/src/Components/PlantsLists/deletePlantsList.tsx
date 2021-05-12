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
  plantsListId,
}: PropsFromRedux) => {
  const handlerDeletePlantsList = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await deletePlantsList(plantsListId);
    await getPlantsListsForUser();
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
  plantsListId: ownProps.plantsListId,
});

const mapDispatch = {
  deletePlantsList: deletePlantsList,
  getPlantsListsForUser: getPlantsListsForUser,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const DeletePlantsListConnected = connector(DeletePlantsList);
