import React from 'react';

import FlowerComponent from '../../Components/Flower';
import PlantsListComponent from '../../Components/PlantsList';


const PlantsList = () => {
  
  return (
      <div className="viewContainer">
        <PlantsListComponent />
        <FlowerComponent />
      </div>
  );
};

export default PlantsList;