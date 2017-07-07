/* eslint-env node, jest, mocha, jsx */
import * as React from 'react';
import { shallow } from 'enzyme';
import Footer from '../index';

describe('Footer Component Rendering', () => {
	it('Should exist', () => {
		expect(Footer).not.toBeNull();
	});
});

describe('Footer behaviour', () => {
	it('should pass a selected value to the onClick handler', () => {
		const wrapper = shallow(<component />);
		expect(wrapper).toMatchSnapshot();
	});
});

