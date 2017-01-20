import React from 'react';
import { shallow } from 'enzyme';
import { Profiles } from '../Profiles';

function setup() {

    const promiseHelper = {
        resolve: undefined,
        reject: undefined
    }
    const props = {
        session: { profile: undefined },
        sessionActions: { getProfile: jest.fn(() => new Promise((resolve, reject) => { promiseHelper.resolve = resolve, promiseHelper.reject = reject })) }
    }
    const enzymeWrapper = shallow(<Profiles {...props} />);

    return {
        promiseHelper,
        props,
        enzymeWrapper
    }

}

it('renders without crashing', () => {

    const {promiseHelper, enzymeWrapper} = setup();
    promiseHelper.resolve();

});