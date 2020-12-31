import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  showPlantsList,
  getPlantsListsForUser,
} from '../../redux_actions/plantsListsActions';
import AddPlant from './addPlant';
import DeletePlant from './deletePlant';
import Watering from './watering';
import './scss/plantsList.scss';

const PlantsList = ({ showPlantsList, plantsListsData, listIndex }) => {
  const [plants, setPlants] = useState([]);
  const [showAddPlantForm, setShowAddPlantForm] = useState(false);

  useEffect(() => {
    const getPlantsFromList = async () => {
      console.log(listIndex);
      await showPlantsList(
        plantsListsData.userId,
        plantsListsData.plantsLists[listIndex].id
      );
    };

    getPlantsFromList();

    setPlants(plantsListsData.plants);
  }, []);

  useEffect(() => {
    setPlants(plantsListsData.plants);
  }, [plantsListsData.plants]);

  const generatePlantsList = (plantsArray) => {
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

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
});

PlantsList.propTypes = {
  plantsListsData: PropTypes.object,
};

export default connect(mapStateToProps, {
  showPlantsList,
  getPlantsListsForUser,
})(PlantsList);
