/* eslint-env node, jest, mocha, jsx */
import * as React from 'react';
import * as Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Logo from '../index';

function setup (props, test) {
    return () => test(
        Renderer.create(
            <Logo {...props} />
        )
    );
}

describe('Logo Component Rendering', () => {
    const onClick = jest.fn();

	it('Should exist', () => {
		expect(Logo).not.toBeNull();
	});

	it('Should render something even if NO props are received', setup({},
		(component) => expect(component.toJSON()).toMatchSnapshot()
	));

	it('Should render something if it receives props', setup(
		{ 
            alt: 'Logo component test', 
            width: 150, 
            height: 50, 
            imageUrl: 'http://placehold.it/350x150',
            onClick,
         },
		(component) => expect(component.toJSON()).toMatchSnapshot()
	));	
});

describe('Logo behaviour', () => {
    it('should pass a selected value to the onClick handler', setup({},
		(component) => {
            const onClick = jest.fn();
            const wrapper = shallow(
                <component onClick={onClick} />
            );
            expect(wrapper).toMatchSnapshot();
        }
	));    
})