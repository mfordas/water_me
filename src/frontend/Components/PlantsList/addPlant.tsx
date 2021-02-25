import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  addPlantToList,
  uploadPlantImage,
} from '../../redux_actions/plantsActions';
import { showPlantsList } from '../../redux_actions/plantsListsActions';
import setCurrentDate from './setCurrentDate';
import { RootState } from '../../redux_reducers/';
import NameInput from './nameInput';
import WateringInput from './wateringInput';
import ImageInput from './imageInput';
import DateInput from './dateInput';
import './scss/plantsList.scss';

export const AddPlant = ({
  listId,
  addPlantToList,
  plantsData,
  showPlantsList,
}: PropsFromRedux) => {
  const [name, setName] = useState('');
  const [wateringCycle, setWateringCycle] = useState(0);
  const [picture, setPicture] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [startDate, setStartDate] = useState(setCurrentDate(new Date()));

  useEffect(() => {
    const updatePlantsList = async () => {
      await showPlantsList(listId);
    };

    updatePlantsList();
  }, [plantsData, listId, showPlantsList]);

  const handleAddingPlantToList = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (name && wateringCycle && picture && startDate) {
      const plantData = {
        name: name,
        wateringCycle: wateringCycle,
        pictureUrl: picture,
        wateringCycleBeginingData: startDate,
        lastTimeWatered: startDate,
      };

      await addPlantToList(plantData, listId);

      setFormSubmitted(false);
    }
  };

  return (
    <div className='addPlantContainer' data-test='addPlantComponent'>
      <form encType='multipart/form-data'>
        <NameInput
          formSubmitted={formSubmitted}
          name={name}
          setName={setName}
        />
        <WateringInput
          formSubmitted={formSubmitted}
          wateringCycle={wateringCycle}
          setWateringCycle={setWateringCycle}
        />
        <DateInput startDate={startDate} setStartDate={setStartDate} />
        <ImageInput
          formSubmitted={formSubmitted}
          picture={picture}
          setPicture={setPicture}
        />
        <button onClick={(event) => handleAddingPlantToList(event)}>
          Dodaj
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState, ownProps: { listId: number }) => ({
  plantsData: state.plantsData,
  listId: ownProps.listId,
});

const mapDispatch = {
  showPlantsList: showPlantsList,
  addPlantToList: addPlantToList,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddPlant);
