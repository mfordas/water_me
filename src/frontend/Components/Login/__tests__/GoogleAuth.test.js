import React from 'react';
import { shallow } from 'enzyme';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { GoogleAuth } from '../googleAuth';

const mockFunc = jest.fn();

const setUp = (initialState={}) => {
    const wrapper = shallow(<GoogleAuth loginData={initialState} loginExternal={mockFunc}/>);
    return wrapper;
};

describe('Google auth component', () => {
    let wrapper;

    beforeEach(()=> {
        const initialState = {
                loginData: {
                    name: '',
                    googleId: '',
                    invalidData: false,
                },
                    isLogged: false,
            };

            wrapper = setUp(initialState);
    });


    it('Should render without error', () => {
        const component = findByDataTestAtrr(wrapper, 'googleAuthComponent');
        expect(component.length).toBe(1);

    });

    xit('Should emit callback on click event', async () => {
        const component = findByDataTestAtrr(wrapper, 'googleAuthComponent');
        await component.simulate('click');
        const callback = mockFunc.mock.calls.length;
        expect(callback).toBe(1);
    })
})