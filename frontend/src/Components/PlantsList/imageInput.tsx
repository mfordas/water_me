import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import ErrorMessage from '../ErrorMessage/errorMessage';
import { RootState } from '../../redux_reducers/';
import { createFileToUpload } from './helpers';
import './scss/plantsList.scss';

export const ImageInput = ({
  formSubmitted,
  pictureFile,
  setPictureFile,
}: PropsFromRedux) => {
  const validatePicture = () => {
    if (formSubmitted && !pictureFile) {
      return <ErrorMessage errorText='Dodaj zdjęcie' />;
    }
  };

  return (
    <>
      <label data-test='ImageInput'>
        Zdjęcie
        <input
          type='file'
          name='image'
          onChange={async (event) => {
            const file = createFileToUpload(event);
            setPictureFile(file);
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
    pictureFile: File | null;
    setPictureFile: React.Dispatch<React.SetStateAction<File | null>>;
  }
) => ({
  plantsData: state.plantsData,
  formSubmitted: ownProps.formSubmitted,
  pictureFile: ownProps.pictureFile,
  setPictureFile: ownProps.setPictureFile,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ImageInput);
