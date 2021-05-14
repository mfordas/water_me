import { BrowserRouter } from 'react-router-dom';
import { shallow, mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { PlantsList } from '../plantsList';
import { Watering } from '../watering';
import { DeletePlant } from '../deletePlant';
import { AddPlant } from '../addPlant';
import { Provider } from 'react-redux';
import { store } from '../../../redux_store/reduxStore';
import { PlantsListsState } from '../../../redux_actions/plantsListsTypes';

const mockShowPlantsList = jest.fn(() =>
    console.log('Downloading plants lists...')
);

const initialState = {
    plantsListName: 'TestList',
    plantsLists: [
        {
            id: 1,
            userId: 1,
            name: 'TestPlant1',
        },
        {
            id: 2,
            userId: 2,
            name: 'TestPlant2',
        },
        {
            id: 3,
            userId: 3,
            name: 'TestPlant3',
        },
    ],
    userId: '1',
    plantsListDeleted: false,
    plants: [
        {
            id: 1,
            name: 'TestPlant1',
            plantsListId: 1,
            wateringCycle: 1,
            pictureUrl: 'test/path/1',
            wateringCycleBeginingData: new Date(),
            lastTimeWatered: new Date(),
        },
        {
            id: 2,
            name: 'TestPlant2',
            plantsListId: 1,
            wateringCycle: 1,
            pictureUrl: 'test/path/2',
            wateringCycleBeginingData: new Date(),
            lastTimeWatered: new Date(),
        },
        {
            id: 3,
            name: 'TestPlant3',
            plantsListId: 1,
            wateringCycle: 1,
            pictureUrl: 'test/path/3',
            wateringCycleBeginingData: new Date(),
            lastTimeWatered: new Date(),
        },
    ],
};

const initialStateEmpty = {
    plantsListName: 'TestList',
    plantsLists: [],
    userId: '1',
    plantsListDeleted: false,
    plants: [
        {
            id: 1,
            name: 'TestPlant1',
            plantsListId: 1,
            wateringCycle: 1,
            pictureUrl: 'test/path/1',
            wateringCycleBeginingData: new Date(),
            lastTimeWatered: new Date(),
        },
        {
            id: 2,
            name: 'TestPlant2',
            plantsListId: 1,
            wateringCycle: 1,
            pictureUrl: 'test/path/2',
            wateringCycleBeginingData: new Date(),
            lastTimeWatered: new Date(),
        },
        {
            id: 3,
            name: 'TestPlant3',
            plantsListId: 1,
            wateringCycle: 1,
            pictureUrl: 'test/path/3',
            wateringCycleBeginingData: new Date(),
            lastTimeWatered: new Date(),
        },
    ],
};

const setUpMount = (
    listIndex: number,
    testData: PlantsListsState
): ReactWrapper => {
    const wrapper = mount(
        <Provider store={store}>
            <BrowserRouter>
                <PlantsList
                    showPlantsList={mockShowPlantsList}
                    plantsListsData={testData}
                    listIndex={listIndex}
                />
            </BrowserRouter>
        </Provider>
    );
    return wrapper;
};

describe('PlantsList component', () => {
    it('Should render without error', () => {
        const wrapper: ReactWrapper = setUpMount(1, initialState);
        const wateringContainers = wrapper.find(Watering);
        const deletePlantContainers = wrapper.find(DeletePlant);

        expect(wateringContainers.length).toBe(3);
        expect(deletePlantContainers.length).toBe(3);
        expect(wateringContainers.at(0).prop('listId')).toBe(2);
        expect(wateringContainers.at(1).prop('listId')).toBe(2);
        expect(wateringContainers.at(2).prop('listId')).toBe(2);
    });

    it('Should not render if plants list array is empty', () => {
        const wrapper: ReactWrapper = setUpMount(1, initialState);

        const addComponent = wrapper.find('button').at(0);

        expect(wrapper.find(AddPlant).length).toBe(0);

        act(() => {
            addComponent.simulate('click');
        });

        wrapper.update();

        expect(wrapper.find(AddPlant).length).toBe(1);
    });
});
