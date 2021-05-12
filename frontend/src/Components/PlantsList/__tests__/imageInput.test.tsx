import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { ImageInput } from '../imageInput';
import { initialState } from '../../../redux_reducers/plantsReducer';
import { createFileToUpload } from '../helpers';
import { ErrorMessage } from '../../ErrorMessage/errorMessage';

jest.mock('../helpers', () => {
  const helpers = jest.requireActual('../helpers');

  return {
    ...helpers,
    createFileToUpload: jest.fn(),
  };
});

const mockSetPictureFile = jest.fn();

window.URL.createObjectURL = () => 'TestUrlForPicture';

const testFile = new File([JSON.stringify('TestFile')], 'testFile.json');

const setUp = (formSubmitted: boolean, pictureFile: File | null) => {
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

const setUpMount = (
  formSubmitted: boolean,
  picture: File | null
): ReactWrapper => {
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
    const wrapper: ShallowWrapper = setUp(false, testFile);
    const component = findByDataTestAtrr(wrapper, 'ImageInput');
    expect(component.length).toBe(1);
  });

  it('Should show error message', async () => {
    const wrapper: ShallowWrapper = setUp(true, null);

    const errorMessage = wrapper.find(ErrorMessage);

    expect(errorMessage.length).toBe(1);
    expect(errorMessage.prop('errorText')).toBe('Dodaj zdjęcie');
  });
});

describe('Should handle input change', () => {
  const component = setUpMount(true, testFile);

  it('Should emit callback on change event', async () => {
    (createFileToUpload as jest.Mock).mockImplementation(() => testFile);
    const inputElement = component.find('input').at(0);

    await act(async () =>
      inputElement.prop('onChange')({
        target: { files: [testFile] },
        preventDefault: () => jest.fn(),
      })
    );

    component.update();

    expect(createFileToUpload).toHaveBeenCalledTimes(1);
    expect(component.find('.picturePreview').length).toBe(1);
  });
});
