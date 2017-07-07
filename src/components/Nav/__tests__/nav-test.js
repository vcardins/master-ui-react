/* eslint-env node, jest, mocha, jsx */
import * as React from 'react';
import * as Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Nav from '../index';

const menu = {
	items: [
		{ 
			id: 'alpha', 
			href: '/alpha', 
			label: 'Alpha', 
			icon: 'alarm', 
		},
		{ 
			id: 'beta', 
			href: '/beta',
			label: 'Beta',
			icon: 'bath',
			children: [ 
				{ id: 'gama', href: '/gama', label: 'Gama', icon: 'bed' },
				{ id: 'zeta', href: '/zeta', label: 'Zeta', icon: 'beer' },
			],
		},
	],
};

const defaultProps = { 
	routes: menu['items'],
	activeRoute: '',
	position: 'vertical',
};

function loadComponent (props, test) {
	const component = shallow(<Nav {...props} />);
	
	return () => test({
		component,	
	});
}


function setup (props, test) {
	return () => test(
		Renderer.create(
			<Nav {...props} />
		)
	);
}

describe('Navigation Component Rendering', () => {
	it('Should exist', () => {
		expect(Nav).not.toBeNull();
	});

	it('Should render something if it receives required props', setup(
		defaultProps,
		(component) => expect(component.toJSON()).toMatchSnapshot()
	));	
});

describe('Navigation Multilevel Rendering', loadComponent(
	defaultProps,
	({ component }) => {
		const submenu = component.find('#mnu-beta');
		const submenuOptions = submenu.find('.submenu li');
		const expander = submenu.find('.expander');
		const expectedOptionsTotal = defaultProps.routes[1].children.length;

		it('Should have a submenu', () => {
			expect(submenu).toMatchSnapshot();
		});

		it(`Should have a submenu with ${expectedOptionsTotal} entries`, () => {
			expect(submenuOptions.length).toBe(expectedOptionsTotal);
		});

		it('Should show submenu toggle icon', () => {
			expect(expander).not.toBeNull();
		});
	}
));
