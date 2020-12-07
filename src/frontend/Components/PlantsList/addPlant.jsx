import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addPlantToList } from "../../redux_actions/plantsActions";
import { showPlantsList } from "../../redux_actions/plantsListsActions";
import "./scss/plantsList.scss";

const AddPlant = ({ listId, addPlantToList, plantsData, showPlantsList }) => {
  const [name, setName] = useState("");
  const [wateringCycle, setWateringCycle] = useState(0);
  const [picture, setPicture] = useState("");
  
  const setCurrentDate = () => {
      const currentDate = new Date();
      
      const year = currentDate.getUTCFullYear();
      const month = currentDate.getUTCMonth()+1;
      const day = currentDate.getUTCDay() <10 ? `0${currentDate.getUTCDay()}` : currentDate.getUTCDay();
      
      return `${year}-${month}-${day}`;
    }

    const [startDate, setStartDate] = useState(setCurrentDate());

    useEffect(() => {
        const updatePlantsList = async () => {
            await showPlantsList(localStorage.getItem('id'), listId)
        };

        updatePlantsList();

    }, [plantsData])

  const handleAddingPlantToList = async (event) => {
    event.preventDefault();

    const plantData = {
      plantName: name,
      wateringCycle: wateringCycle,
      pictureUrl: picture,
      wateringCycleBeginingData: startDate,
    };

    await addPlantToList(plantData, listId);

    console.log(plantsData);
  };

  return (
    <div className="addPlantContainer">
      <form>
        <label>
          Nazwa
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          Podlewanie co:
          <input
            type="number"
            min={0}
            value={wateringCycle}
            onChange={(e) => {
              setWateringCycle(e.target.value);
            }}
            />
            { wateringCycle == 1 ? `dzień` : 'dni'} 
        </label>
        <label>
          Data startu:
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </label>
        <label>
          Zdjęcie
          <input
            type="file"
            value={picture}
            onChange={(e) => {
              setPicture(e.target.value);
            }}
          />
        </label>
        <button onClick={handleAddingPlantToList}>Dodaj</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  plantsListsData: state.plantsListsData,
  plantsData: state.plantsData,
});

AddPlant.propTypes = {
  plantsListsData: PropTypes.object,
  plantsData: PropTypes.object,
};

export default connect(mapStateToProps, { addPlantToList, showPlantsList })(AddPlant);
