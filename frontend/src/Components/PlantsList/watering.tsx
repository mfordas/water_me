import { connect, ConnectedProps } from 'react-redux';

import { updateLastWateringDate } from '../../redux_actions/plantsActions';
import { showPlantsList } from '../../redux_actions/plantsListsActions';
import { useCountWatering } from './hooks';
import { WateringProps } from './plantsList';
import { RootState } from '../../redux_reducers/';

import './scss/plantsList.scss';

export const Watering = ({
  updateLastWateringDate,
  showPlantsList,
  lastWateringDate,
  plantId,
  wateringCycle,
  listId,
}: PropsFromRedux) => {
  const { nextWateringIn, currentDate } = useCountWatering(
    lastWateringDate,
    wateringCycle
  );

  const handleUpdateLastWateringDate = async () => {
    await updateLastWateringDate(plantId, currentDate);
    await showPlantsList(listId);
  };

  const renderWateringStatus = () => {
    if (nextWateringIn > 0) {
      return (
        <div className='wateringStatusContainer'>
          <div className='statusOk'>U mnie w porządku!</div>
          <div className='nextWateringContainer'>
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

  return (
    <div className='wateringContainer' data-test='WateringComponent'>
      {renderWateringStatus()}
    </div>
  );
};

const mapStateToProps = (state: RootState, ownProps: WateringProps) => ({
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
