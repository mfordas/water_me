import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { uploadPlantImage } from '../../redux_actions/plantsActions';
import ErrorMessage from '../ErrorMessage/errorMessage';
import { RootState } from '../../redux_reducers/';
import { handleUploadingFile } from './helpers';
import './scss/plantsList.scss';

export const ImageInput = ({
  formSubmitted,
  picture,
  setPicture,
  uploadPlantImage,
}: PropsFromRedux) => {
  const validatePicture = () => {
    if (formSubmitted && !picture) {
      return <ErrorMessage errorText='Dodaj zdjęcie' />;
    }
  };

  return (
    <>
      <label>
        Zdjęcie
        <input
          type='file'
          name='image'
          onChange={async (event) => {
            await handleUploadingFile(event, uploadPlantImage, setPicture);
          }}
        />
      </label>
      {validatePicture()}
    </>
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: {
    formSubmitted: boolean;
    picture: string;
    setPicture: React.Dispatch<React.SetStateAction<string>>;
  }
) => ({
  plantsData: state.plantsData,
  formSubmitted: ownProps.formSubmitted,
  picture: ownProps.picture,
  setPicture: ownProps.setPicture,
});

const mapDispatch = {
  uploadPlantImage: uploadPlantImage,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ImageInput);
