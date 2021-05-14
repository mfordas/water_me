import { shallow, ShallowWrapper } from 'enzyme';

import { ErrorMessage } from '../errorMessage';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';

const setUp = (props: { errorText: string } = { errorText: '' }) => {
    const component = shallow(<ErrorMessage {...props} />);
    return component;
};

describe('Footer component', () => {
    let component: ShallowWrapper;

    const props = {
        errorText: 'Error',
    };

    it('should render without errors', () => {
        component = setUp(props);

        const wrapper = findByDataTestAtrr(component, 'errorMessageComponent');

        expect(wrapper.length).toBe(1);
    });

    it('Should not be render if no props passed', () => {
        component = setUp();

        const wrapper = findByDataTestAtrr(component, 'errorMessageComponent');

        expect(wrapper.length).toBe(0);
    });
});
