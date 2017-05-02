/* eslint-env node, jest, mocha, jsx */
import * as React from 'react';
import * as Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Nav from '../index';
import * as menu from '../../../menu.json';

const defaultProps = { 
    routes: menu['items'],
    activeRoute: '',
    position: 'vertical',
};

function setup (props, test) {
    return () => test(
        Renderer.create(
            <Nav {...props} />
        )
    );
}

describe('LeftPanel Component Rendering', () => {
	it('Should exist', () => {
		expect(Nav).not.toBeNull();
	});

	it('Should render something if it receives required props', setup(
		defaultProps,
		(component) => expect(component.toJSON()).toMatchSnapshot()
	));	
});

describe('LeftPanel behaviour', () => {
    it('should pass a selected value to the onClick handler', setup(
        defaultProps,
		() => {
            const wrapper = shallow(<Nav {...defaultProps} />);
            expect(wrapper).toMatchSnapshot();
        }
	));    
})