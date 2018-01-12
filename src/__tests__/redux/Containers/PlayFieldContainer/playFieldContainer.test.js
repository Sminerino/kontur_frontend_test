/**
 * @jest-environment node
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import PlayFieldContainer from './../../../../redux/Containers/PlayFieldContainer/PlayFieldContainer';

test('123', () => {
    const test = shallow(<PlayFieldContainer />);
    console.log(test);
});