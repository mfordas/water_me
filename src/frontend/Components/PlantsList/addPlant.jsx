import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addPlantToList } from "../../redux_actions/plantsActions";
import { showPlantsList } from "../../redux_actions/plantsListsActions";
import ErrorMessage from "../ErrorMessage/errorMessage";
import setCurrentDate from './setCurrentDate';
import "./scss/plantsList.scss";

const AddPlant = ({ listId, addPlantToList, plantsData, showPlantsList }) => {
  const [name, setName] = useState("");
  const [wateringCycle, setWateringCycle] = useState(0);
  const [picture, setPicture] = useState("");
  const [formSubmited, setFormSubmitted] = useState(false);

  const [startDate, setStartDate] = useState(setCurrentDate());

  useEffect(() => {
    const updatePlantsList = async () => {
      await showPlantsList(localStorage.getItem("id"), listId);
    };

    updatePlantsList();
  }, [plantsData]);

  const handleAddingPlantToList = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (name && wateringCycle && picture && startDate && formSubmited) {
      const plantData = {
        name: name,
        wateringCycle: wateringCycle,
        pictureUrl: picture,
        wateringCycleBeginingData: startDate,
        lastTimeWatered: startDate,
      };

      await addPlantToList(plantData, listId);

      console.log('works');

      setFormSubmitted(false);
    }
  };

  const validateName = () => {
    if (formSubmited && !name) {
      return <ErrorMessage errorText="Wpisz imię" />;
    } else if (formSubmited && name.length <= 3) {
      return <ErrorMessage errorText="Imię powinno być dłuższe niż 3 znaki" />;
    }
  };

  const validateWateringCycle = () => {
    if (formSubmited && wateringCycle === 0) {
      return <ErrorMessage errorText="Wpisz czestotliwość podlewania" />;
    }
  };

  const validatePicture = () => {
    if (formSubmited && !picture) {
      return <ErrorMessage errorText="Dodaj zdjęcie" />;
    }
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
        {validateName()}
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
          {wateringCycle == 1 ? `dzień` : "dni"}
        </label>
        {validateWateringCycle()}
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
        {validatePicture()}
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

export default connect(mapStateToProps, { addPlantToList, showPlantsList })(
  AddPlant
);
