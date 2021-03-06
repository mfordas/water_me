import { BrowserRouter } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { AddPlant } from '../addPlant';
import { PlantsState } from '../../../redux_actions/plantsTypes';
import { store } from '../../../redux_store/reduxStore';
import { NameInput } from '../nameInput';
import { DateInput } from '../dateInput';
import { ImageInput } from '../imageInput';
import { WateringInput } from '../wateringInput';
import { setCurrentDate } from '../setCurrentDate';

jest.mock('../helpers', () => {
    const helpers = jest.requireActual('../helpers');

    return {
        ...helpers,
        handleUploadingFile: () => Promise.resolve('TestPlantName'),
    };
});

const mockShowPlantsList = jest.fn();
const mockAddPlantToList = jest.fn();
const mockUploadPlantImage = jest.fn();

const setUp = (initialState: PlantsState) => {
    const wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <AddPlant
                    listId={1}
                    addPlantToList={mockAddPlantToList}
                    plantsData={initialState}
                    showPlantsList={mockShowPlantsList}
                    uploadPlantImage={mockUploadPlantImage}
                />
            </BrowserRouter>
        </Provider>
    );
    return wrapper;
};

describe('Add plants list component', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
        const initialState = {
            plantData: {
                id: 1,
                name: 'abc',
                plantsListId: 1,
                wateringCycle: 1,
                pictureUrl: 'abc',
                wateringCycleBeginingData: new Date(),
                lastTimeWatered: new Date(),
            },
            plantDeleted: false,
            wateringDateUpdated: false,
            imageName: '',
        };
        wrapper = setUp(initialState);
    });

    it('Should render without error', () => {
        const component = findByDataTestAtrr(wrapper, 'addPlantComponent');

        expect(component.length).toBe(1);
        expect(component.find(WateringInput).length).toBe(1);
        expect(component.find(DateInput).length).toBe(1);
        expect(component.find(ImageInput).length).toBe(1);
        expect(component.find(NameInput).length).toBe(1);
    });

    it('Should change state and send request to add a plant if all values are filled', async () => {
        const testName = 'TestName';
        const testWatering = 3;
        const testPicture = new File([''], 'test');

        act(() => {
            wrapper.find(NameInput).prop('setName')(testName);
            wrapper.find(WateringInput).prop('setWateringCycle')(testWatering);
            wrapper.find(ImageInput).prop('setPictureFile')(testPicture);
        });

        wrapper.update();

        expect(wrapper.find(DateInput).prop('startDate')).toBe(
            setCurrentDate(new Date())
        );
        expect(wrapper.find(NameInput).prop('name')).toBe(testName);
        expect(wrapper.find(WateringInput).prop('wateringCycle')).toBe(
            testWatering
        );
        expect(wrapper.find(ImageInput).prop('pictureFile')).toBe(testPicture);

        await act(async () => {
            wrapper.find('button').at(0).simulate('click');
            wrapper.update();
        });

        expect(wrapper.find(NameInput).prop('formSubmitted')).toBe(false);
        expect(mockAddPlantToList).toBeCalledTimes(1);
        expect(mockShowPlantsList).toBeCalledTimes(1);
    });
});
