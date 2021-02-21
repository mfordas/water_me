import React, { useState, useEffect, ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
  addPlantToList,
  uploadPlantImage,
} from '../../redux_actions/plantsActions';
import { showPlantsList } from '../../redux_actions/plantsListsActions';
import ErrorMessage from '../ErrorMessage/errorMessage';
import setCurrentDate from './setCurrentDate';
import { RootState } from '../../redux_reducers/';
import NameInput from './nameInput';
import WateringInput from './wateringInput';
import './scss/plantsList.scss';

export const AddPlant = ({
  listId,
  addPlantToList,
  uploadPlantImage,
  plantsData,
  showPlantsList,
}: PropsFromRedux) => {
  const [name, setName] = useState('');
  const [wateringCycle, setWateringCycle] = useState(0);
  const [picture, setPicture] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [startDate, setStartDate] = useState(setCurrentDate());

  useEffect(() => {
    const updatePlantsList = async () => {
      await showPlantsList(listId);
    };

    updatePlantsList();
  }, [plantsData, listId, showPlantsList]);

  const handleUploadingFile = async (event: ChangeEvent) => {
    event.preventDefault();

    const photoData = new FormData();

    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {
      photoData.append('image', file);
    }

    const imageName = await uploadPlantImage(photoData);

    setPicture(imageName);
  };

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

  const validateName = () => {
    if (formSubmitted && !name) {
      return <ErrorMessage errorText='Wpisz imię' />;
    } else if (formSubmitted && name.length <= 3) {
      return <ErrorMessage errorText='Imię powinno być dłuższe niż 3 znaki' />;
    }
  };

  const validatePicture = () => {
    if (formSubmitted && !picture) {
      return <ErrorMessage errorText='Dodaj zdjęcie' />;
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
        <label>
          Data startu:
          <input
            type='date'
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </label>
        <label>
          Zdjęcie
          <input
            type='file'
            name='image'
            onChange={async (event) => {
              await handleUploadingFile(event);
            }}
          />
        </label>
        {validatePicture()}
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
  uploadPlantImage: uploadPlantImage,
  showPlantsList: showPlantsList,
  addPlantToList: addPlantToList,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddPlant);
