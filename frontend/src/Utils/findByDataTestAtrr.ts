import { ShallowWrapper, ReactWrapper } from 'enzyme';

export const findByDataTestAtrr = (
    component: ShallowWrapper | ReactWrapper,
    attr: string
): ShallowWrapper | ReactWrapper => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};
