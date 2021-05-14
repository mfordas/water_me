import { shallow, mount, ShallowWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { initialState } from '../../../redux_reducers/plantsReducer';
import { PlantsState } from '../../../redux_actions/plantsTypes';
import { DeletePlant } from '../deletePlant';

const mockDeletePlantFunc = jest.fn(() => console.log('Deleting plant'));

const mockShowPlantsListFunc = jest.fn(() =>
    console.log('Updating plants list')
);

const setUp = (startState: PlantsState = initialState) => {
    const wrapper = shallow(
        <DeletePlant
            plantsData={startState}
            plantId={1}
            listId={1}
            deletePlant={mockDeletePlantFunc}
            showPlantsList={mockShowPlantsListFunc}
        />
    );
    return wrapper;
};

const setUpMount = (startState: PlantsState = initialState) => {
    const wrapper = mount(
        <DeletePlant
            plantsData={startState}
            plantId={1}
            listId={1}
            deletePlant={mockDeletePlantFunc}
            showPlantsList={mockShowPlantsListFunc}
        />
    );
    return wrapper;
};

describe('DeletePlant component', () => {
    let wrapper: ShallowWrapper;

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
        const component = findByDataTestAtrr(wrapper, 'deletePlantButton');
        expect(component.length).toBe(1);
    });
});

describe('Should handle submit Google login button', () => {
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

    const component = setUpMount(initialState);

    it('Should emit callback on click event', async () => {
        await act(async () => {
            component.simulate('click');
        });

        expect(mockDeletePlantFunc).toHaveBeenCalledTimes(1);
        expect(mockShowPlantsListFunc).toHaveBeenCalledTimes(1);
    });
});
