import React, { useState } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { showPlantsList } from '../../redux_actions/plantsListsActions';
import { AddPlantConnected } from './addPlant';
import { DeletePlantConnected } from './deletePlant';
import { WateringConnected } from './watering';
import { RootState } from '../../redux_reducers/';
import { Plant } from '../../redux_actions/plantsTypes';
import { useCreatePlantsList } from './hooks';
import { apiUrl } from '../../Utils/apiUrl';

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

export const PlantsList = ({
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
    if (plantsArray.length > 0) {
      const plantsList = plantsArray.map((plant, index) => {
        return (
          <div key={index} className='plantContainer'>
            <div>{plant.name}</div>
            <img
              src={`${apiUrl()}static/images/${plant.pictureUrl}.png`}
              alt='Plant'
            />
            <div>Podlewanie co: {plant.wateringCycle}</div>
            <WateringConnected
              lastWateringDate={plant.lastTimeWatered}
              plantId={plant.id}
              wateringCycle={plant.wateringCycle}
              listId={plantsListsData.plantsLists[listIndex].id}
            />
            <DeletePlantConnected
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
        <AddPlantConnected listId={plantsListsData.plantsLists[listIndex].id} />
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
  showPlantsList: showPlantsList,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const PlantsListConnected = connector(PlantsList);
