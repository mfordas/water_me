import React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { act } from 'react-dom/test-utils';
import { ImageInput } from '../imageInput';
import { initialState } from '../../../redux_reducers/plantsReducer';
import { createFileToUpload } from '../helpers';
import ErrorMessage from '../../ErrorMessage/errorMessage';

jest.mock('../helpers', () => {
  const helpers = jest.requireActual('../helpers');

  return {
    ...helpers,
    createFileToUpload: jest.fn(),
  };
});

const mockSetPictureFile = jest.fn();

const setUp = (formSubmitted: boolean, pictureFile: File) => {
  const wrapper = shallow(
    <ImageInput
      formSubmitted={formSubmitted}
      pictureFile={pictureFile}
      setPictureFile={mockSetPictureFile}
      plantsData={initialState}
    />
  );
  return wrapper;
};

const setUpMount = (formSubmitted: boolean, picture: File): ReactWrapper => {
  const wrapper = mount(
    <ImageInput
      formSubmitted={formSubmitted}
      pictureFile={picture}
      setPictureFile={mockSetPictureFile}
      plantsData={initialState}
    />
  );
  return wrapper;
};

describe('Image input component', () => {
  it('Should render without error', () => {
    const wrapper: ShallowWrapper = setUp(false, '12345');
    const component = findByDataTestAtrr(wrapper, 'ImageInput');
    expect(component.length).toBe(1);
  });

  it('Should show error message', async () => {
    const wrapper: ShallowWrapper = setUp(true, '');

    const errorMessage = wrapper.find(ErrorMessage);

    expect(errorMessage.length).toBe(1);
    expect(errorMessage.prop('errorText')).toBe('Dodaj zdjęcie');
  });
});

describe('Should handle input change', () => {
  const component = setUpMount(true, 'testImagePath');

  it('Should emit callback on change event', async () => {
    (createFileToUpload as jest.Mock).mockImplementation(() => {});
    const inputElement = component.find('input').at(0);

    await act(async () => inputElement.prop('onChange')(undefined));

    expect(createFileToUpload).toHaveBeenCalledTimes(1);
  });
});
