import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateLastWateringDate } from "../../redux_actions/plantsActions";
import { showPlantsList } from "../../redux_actions/plantsListsActions";
import setCurrentDate from "./setCurrentDate";
import "./scss/plantsList.scss";

const Watering = ({
  updateLastWateringDate,
  showPlantsList,
  lastWateringDate,
  plantId,
  wateringCycle,
  listId,
}) => {
  const currentDate = setCurrentDate();
  const oneDayInMiliseconds = 86400000;

  const handleUpdateLastWateringDate = async () => {
    const userId = localStorage.getItem("id");

    await updateLastWateringDate(userId, plantId, currentDate);
    await showPlantsList(userId, listId);
  };

  const countWatering = () => {
    const countDaysSinceLastWatering =
      (new Date(currentDate).getTime() - new Date(lastWateringDate).getTime()) /
      oneDayInMiliseconds;

    if (countDaysSinceLastWatering < wateringCycle) {
      return (
        <div className="wateringStatusContainer">
          <div className="daysTillNextWatering">
            {wateringCycle - countDaysSinceLastWatering}
          </div>
          <div className="status">U mnie w porządku!</div>
        </div>
      );
    } else {
      return (
        <div className="wateringStatusContainer">
          <div className="status">Potrzebuję wody!</div>
          <button onClick={handleUpdateLastWateringDate}>Podlej</button>
        </div>
      );
    }
  };

  return <div className="wateringContainer">{countWatering()}</div>;
};

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
  plantsData: state.plantsData,
});

Watering.propTypes = {
  plantsListsData: PropTypes.object,
  plantsData: PropTypes.object,
};

export default connect(mapStateToProps, {
  updateLastWateringDate,
  showPlantsList,
})(Watering);
