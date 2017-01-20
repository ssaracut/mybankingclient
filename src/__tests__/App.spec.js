import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';

function setup() {

    const props = {
        sessionActions: { getStoredAuthData: jest.fn() }
    }

    const enzymeWrapper = shallow(<App {...props} />);

    return {
        props,
        enzymeWrapper
    }

}

it('renders without crashing', () => {

    const {enzymeWrapper} = setup();

});