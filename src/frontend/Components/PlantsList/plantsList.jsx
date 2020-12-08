import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { showPlantsList } from '../../redux_actions/plantsListsActions';
import AddPlant from './addPlant';
import './scss/plantsList.scss';

const PlantsList = ({ showPlantsList, plantsListsData, listIndex }) => {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        const getPlantsFromList = async () => {
            await showPlantsList(plantsListsData.userId, plantsListsData.plantsLists[listIndex].id);
        };

        getPlantsFromList();

        setPlants(plantsListsData.plants);

    }, []);

    useEffect(() => {
        setPlants(plantsListsData.plants);
    }, [plantsListsData.plants])

    const generatePlantsList = (plantsArray) => {
        if (plantsArray) {
            const plantsList = plantsArray.map((plant, index) => {
                return (
                    <div key={index} className='plantContainer'>
                        <div>{plant.name}</div>
                        <div>{plant.pictureUrl}</div>
                        <div>{plant.wateringCycle}</div>
                        <div>{plant.wateringCycle}</div>
                    </div>
                )
            });

            return plantsList
        }
        else {
            return <></>
        }
    }

    return (
        <>
        <AddPlant listId={plantsListsData.plantsLists[listIndex].id} />
        <div className='plantsContainer'>
            <div className='plantsContainerHeader'>
                <div>Nazwa</div>
                <div>Zdjęcie</div>
                <div>Podlewanie co:</div>
                <div>Status</div>
            </div>
            {generatePlantsList(plants)}
            </div>
        </>
    )
};

const mapStateToProps = (state) => ({
    plantsListsData: state.plantsListsData,
});

PlantsList.propTypes = {
    plantsListsData: PropTypes.object
}

export default connect(mapStateToProps, { showPlantsList })(PlantsList);