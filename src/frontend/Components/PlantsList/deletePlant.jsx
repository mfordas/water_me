import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deletePlant } from '../../redux_actions/plantsActions';
import { showPlantsList } from '../../redux_actions/plantsListsActions';
import './scss/plantsList.scss';

const DeletePlant = ({ deletePlant, showPlantsList, plantsData, plantId, listId }) => {

    const handleDeletePlant = async () => {
        await deletePlant(localStorage.getItem("id"), plantId);
        await showPlantsList(localStorage.getItem("id"), listId);
    }

    return (
            <button className='deleteButton' onClick={handleDeletePlant}>Usuń</button>
    )
};

const mapStateToProps = (state) => ({
    plantsData: state.plantsData,
});

DeletePlant.propTypes = {
    plantsData: PropTypes.object,
};

export default connect(mapStateToProps, { deletePlant , showPlantsList } )(DeletePlant);