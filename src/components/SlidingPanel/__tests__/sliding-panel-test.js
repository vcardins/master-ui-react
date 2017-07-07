/* eslint-env node, jest, mocha, jsx */
import * as React from 'react';
import * as Renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import SlidingPanel from '../index';

const elTag = 'sliding-panel';

function setup (props, test) {
	return () => test(
		Renderer.create(
			<SlidingPanel {...props} />
		)
	);
}

function loadComponent (fn, props, test, attachTo = {}) {
	const component = fn(<SlidingPanel {...props} />, attachTo);
	const trigger = component.find(`#${elTag}-pin`);
	const content = component.find(`#${elTag}-content`);

	return () => test({
		component,
		content,
		trigger,
	});
}

describe('SlidingPanel Component Rendering', () => {
	it('Should exist', () => {
		expect(SlidingPanel).not.toBeNull();
	});

	it('Should render something even if NO props are received', setup({},
		(Component) => expect(Component.toJSON()).toMatchSnapshot()
	));
});

const contentText = 'Element Exists';

/* Validate component rendering */
describe('Validate DOM element', loadComponent(shallow,
	{ children: <div>{contentText}</div> },
	({ component, content, trigger }) => {
		it('Should render to static HTML content', () => {
			expect(content.text()).toEqual(contentText);
		});
		
		it('Should load toggle trigger', () => {
			expect(trigger).not.toBeNull();
		});

		it('Should appears on the app\'s right side if position property is not set', () => {
			expect(component.hasClass('right')).toEqual(true);
		});
	}
));

/* Dropdown Selector Tests */
describe('Validate component behaviours', loadComponent(mount,
	{ 
		position: 'left',
		children: <div>{contentText}</div>, 
	},
	({ component, trigger }) => {
		it('Should appears on the app\'s left side', () => {
			expect(component.hasClass('left')).toEqual(true);
		});

		trigger.simulate('change', { stopPropagation: () => {}, preventDefault: () => {}, target: { checked: true } });
		
		it('Should expands the panel', () => {
			expect(component.hasClass('expanded')).toEqual(true);
		});		
	},
	{ attachTo: document.body }
));
