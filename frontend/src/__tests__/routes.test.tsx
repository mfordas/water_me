import { BrowserRouter } from 'react-router-dom';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';


import { PrivateRouteConnected as PrivateRoute } from '../Components/PrivateRoute';
import { Routes } from '../routes';

const setUp = () => {
    const wrapper = shallow(
        <Routes
        />
    );
    return wrapper;
};

describe('PlantsList component', () => {
    it('Should render without error', () => {
        const wrapper: ShallowWrapper = setUp();
        const privateRoutes = wrapper.find(PrivateRoute);
        expect(privateRoutes.length).toBe(3);
    });
});
