import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPlantsListsForUser } from '../../redux_actions/plantsListsActions';
import DeletePlantsList from './deletePlantsList';
import { RootState } from '../../redux_reducers/';
import { PlantsList } from '../../redux_actions/plantsListsTypes';
import './scss/plantsLists.scss';

export const ShowPlantsLists = ({
  getPlantsListsForUser,
  plantsListsData,
}: PropsFromRedux) => {
  useEffect(() => {
    const getPlantsLists = async () => {
      await getPlantsListsForUser();
    };

    getPlantsLists();
  }, []);

  const generatePlantsLists = (plantsListsArray: PlantsList[]) => {
    return (
      <div
        className='plantsListsContainer'
        data-test='showPlantsListsComponent'
      >
        {plantsListsArray.map((plantsList) => {
          return (
            <div
              className='plantsListContainer'
              key={plantsList.id}
              data-test='plantsListContainer'
            >
              <div>{plantsList.name}</div>
              <Link to={`/plantsLists/${plantsList.name}`}>Przejdź</Link>
              <DeletePlantsList plantsListId={plantsList.id} />
            </div>
          );
        })}
      </div>
    );
  };

  return <>{generatePlantsLists(plantsListsData.plantsLists)}</>;
};

const mapStateToProps = (state: RootState) => ({
  plantsListsData: state.plantsListsData,
});

const mapDispatch = {
  getPlantsListsForUser: getPlantsListsForUser,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ShowPlantsLists);
