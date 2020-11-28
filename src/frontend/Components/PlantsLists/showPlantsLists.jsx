import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getPlantsLists, getPlantsListsForUser } from '../../redux_actions/plantsListsActions';
import './scss/plantsLists.scss';

const ShowPlantsLists = ({ getPlantsListsForUser, plantsListsData }) => {

    useEffect(() => {
        const getPlantsLists = async () => {
            await getPlantsListsForUser(localStorage.getItem('id'));
        };

        getPlantsLists();
    }, []);

    const generatePlantsLists = (plantsListsArray) => {
        return (
            <div className="plantsListsContainer">
                {plantsListsArray.map(plantsList => {
                    return <div className="plantsListContainer" key={plantsList.id}>
                        <div>{plantsList.name}</div>
                        <Link to={plantsList.name}>Przejdź</Link>
                    </div>
                })}
            </div>
        )
    }

    return (
        <>
            {generatePlantsLists(plantsListsData.plantsLists)}
        </>
    )
};

const mapStateToProps = (state) => ({
    plantsListsData: state.plantsListsData,
});

ShowPlantsLists.propTypes = {
    plantsListsData: PropTypes.object
}

export default connect(mapStateToProps, { getPlantsListsForUser })(ShowPlantsLists);