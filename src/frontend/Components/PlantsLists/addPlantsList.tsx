import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  addPlantsList,
  getPlantsListsForUser,
} from '../../redux_actions/plantsListsActions';
import { RootState } from '../../redux_reducers/';
import './scss/plantsLists.scss';

export const AddPlantsList = ({
  addPlantsList,
  getPlantsListsForUser,
}: PropsFromRedux) => {
  const [plantsListName, setPlantsListName] = useState('');
  const [submitPlantsList, setSubmitPlantsList] = useState(false);

  const verifyPlantsListName = () =>
    !plantsListName && submitPlantsList ? 'Najpierw wpisz nazwę listy!' : null;

  const addNewPlantsList = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    if (e) {
      e.preventDefault();
    }
    setSubmitPlantsList(true);
    if (plantsListName) {
      await addPlantsList(plantsListName);
      setSubmitPlantsList(false);
      const id = localStorage.getItem('id');
      if (id) {
        await getPlantsListsForUser(id);
      }
    } else return;
  };

  return (
    <div className='addPlantsListContainer' data-test='addPlantListComponent'>
      <form className='addPlantsListForm'>
        <input
          data-test='inputAddPlantsList'
          onChange={(e) => setPlantsListName(e.target.value)}
        ></input>
        <button
          data-test='addPlantsListButton'
          onClick={(e) => addNewPlantsList(e)}
        >
          Dodaj listę roślin
        </button>
      </form>
      <div>{verifyPlantsListName()}</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  plantsListsData: state.plantsListsData,
});

const mapDispatch = {
  getPlantsListsForUser: getPlantsListsForUser,
  addPlantsList: addPlantsList,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddPlantsList);
