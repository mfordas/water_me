import { shallow, ShallowWrapper } from 'enzyme';

import { PlantsList } from '../index';
import { PlantsListComponentConnected } from '../../../Components/PlantsList/index';

const setUp = () => {
    const component = shallow(<PlantsList />);
    return component;
};

describe('HomePage component', () => {
    let component: ShallowWrapper;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render without error', () => {
        expect(component.find(PlantsListComponentConnected).length).toBe(1);
    });
});
