import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deletePlantsList, getPlantsListsForUser } from '../../redux_actions/plantsListsActions';
import './scss/plantsLists.scss';

const DeletePlantsList = ({ deletePlantsList, getPlantsListsForUser, plantsListsData, plantsListId }) => {

    const handlerDeletePlantsList = async (e) => {
        e.preventDefault();
        await deletePlantsList(plantsListsData.userId, plantsListId);
        await getPlantsListsForUser(localStorage.getItem('id'));
    }


    return (
        <button className='deleteButton' onClick={(e) => handlerDeletePlantsList(e)}>
           Usuń
        </button>
        )
};

const mapStateToProps = (state) => ({
    plantsListsData: state.plantsListsData
});

DeletePlantsList.propTypes = {
    plantsListData: PropTypes.object
};

export default connect(mapStateToProps, { deletePlantsList, getPlantsListsForUser })(DeletePlantsList);