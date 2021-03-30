import React from 'react';

import PlantsListsComponent from '../../Components/PlantsLists';
import PlantsListComponent from '../../Components/PlantsList';

const PlantsLists = () => {
  return (
    <div className='viewContainer'>
      <PlantsListsComponent />
      <PlantsListComponent />
    </div>
  );
};

export default PlantsLists;
