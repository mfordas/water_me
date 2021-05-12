import { PlantsListsComponent } from '../../Components/PlantsLists';
import { PlantsListComponentConnected } from '../../Components/PlantsList';

export const PlantsLists = () => {
  return (
    <div className='viewContainer'>
      <PlantsListsComponent />
      <PlantsListComponentConnected />
    </div>
  );
};
