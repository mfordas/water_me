import { connect, ConnectedProps } from 'react-redux';

import { updateLastWateringDate } from '../../redux_actions/plantsActions';
import { showPlantsList } from '../../redux_actions/plantsListsActions';
import setCurrentDate from './setCurrentDate';
import { WateringProps } from './plantsList';
import { RootState } from '../../redux_reducers/';
import './scss/plantsList.scss';

const Watering = ({
  updateLastWateringDate,
  showPlantsList,
  lastWateringDate,
  plantId,
  wateringCycle,
  listId,
}: PropsFromRedux) => {
  const currentDate = setCurrentDate();
  const oneDayInMiliseconds = 86400000;

  const handleUpdateLastWateringDate = async () => {
    const userId = localStorage.getItem('id');
    if (userId) {
      await updateLastWateringDate(userId, plantId, currentDate);
      await showPlantsList(userId, listId);
    } else {
      console.error('User id not found');
    }
  };

  const countWatering = () => {
    const countDaysSinceLastWatering =
      (new Date(currentDate).getTime() - new Date(lastWateringDate).getTime()) /
      oneDayInMiliseconds;

    const nextWateringIn = wateringCycle - countDaysSinceLastWatering;

    if (countDaysSinceLastWatering < wateringCycle) {
      return (
        <div className='wateringStatusContainer'>
          <div className='statusOk'>U mnie w porządku!</div>
          <div>
            Kolejne podlewanie za: {nextWateringIn}
            {nextWateringIn === 1 ? ' dzień' : ' dni'}
          </div>
        </div>
      );
    } else {
      return (
        <div className='wateringStatusContainer'>
          <div className='statusNok'>Potrzebuję wody!</div>
          <button onClick={handleUpdateLastWateringDate}>Podlej</button>
        </div>
      );
    }
  };

  return <div className='wateringContainer'>{countWatering()}</div>;
};

const mapStateToProps = (state: RootState, ownProps: WateringProps) => ({
  plantsListsData: state.plantsListsData,
  plantsData: state.plantsData,
  lastWateringDate: ownProps.lastWateringDate,
  plantId: ownProps.plantId,
  wateringCycle: ownProps.wateringCycle,
  listId: ownProps.listId,
});

const mapDispatch = {
  updateLastWateringDate: updateLastWateringDate,
  showPlantsList: showPlantsList,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Watering);
