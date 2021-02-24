import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  showPlantsList,
  getPlantsListsForUser,
} from '../../redux_actions/plantsListsActions';
import AddPlant from './addPlant';
import DeletePlant from './deletePlant';
import Watering from './watering';
import { RootState } from '../../redux_reducers/';
import { Plant } from '../../redux_actions/plantsTypes';
import { useCreatePlantsList } from './hooks';
import './scss/plantsList.scss';

export type DeletePlantProps = {
  plantId: number;
  listId: number;
};

export type WateringProps = {
  lastWateringDate: Date;
  plantId: number;
  wateringCycle: number;
  listId: number;
};

const PlantsList = ({
  showPlantsList,
  plantsListsData,
  listIndex,
}: PropsFromRedux) => {
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);
  const plants = useCreatePlantsList(
    plantsListsData,
    showPlantsList,
    listIndex
  );

  const generatePlantsList = (plantsArray: Plant[]) => {
    if (plantsArray) {
      const plantsList = plantsArray.map((plant, index) => {
        return (
          <div key={index} className='plantContainer'>
            <div>{plant.name}</div>
            <img src={`../../images/${plant.pictureUrl}.png`} alt='Plant' />
            <div>Podlewanie co: {plant.wateringCycle}</div>
            <Watering
              lastWateringDate={plant.lastTimeWatered}
              plantId={plant.id}
              wateringCycle={plant.wateringCycle}
              listId={plantsListsData.plantsLists[listIndex].id}
            />
            <DeletePlant
              plantId={plant.id}
              listId={plantsListsData.plantsLists[listIndex].id}
            />
          </div>
        );
      });

      return plantsList;
    } else {
      return <></>;
    }
  };

  return (
    <>
      <button
        className='addPlantButton'
        onClick={() => setShowAddPlantForm(!showAddPlantForm)}
      >
        Dodaj roślinę
      </button>
      {showAddPlantForm ? (
        <AddPlant listId={plantsListsData.plantsLists[listIndex].id} />
      ) : null}
      <div className='plantsContainer'>{generatePlantsList(plants)}</div>
    </>
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: { listIndex: number }
) => ({
  plantsListsData: state.plantsListsData,
  listIndex: ownProps.listIndex,
});

const mapDispatch = {
  getPlantsListsForUser: getPlantsListsForUser,
  showPlantsList: showPlantsList,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PlantsList);
