import React from 'react';
import { shallow } from 'enzyme';
import NoMatch from '../NoMatch';

it('renders without crashing', () => {

    const enzymeWrapper = shallow(<NoMatch />);

});