/* eslint-env node, jest, mocha, jsx */
import * as React from 'react';
import * as Renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Header from '../index';
import * as menu from '../../menu.json';

const user = {
  userId: 1,
  username: 'admin',
  firstName: 'System',
  lastName: 'Admin',
  displayName: 'System A.',
  fullName: 'System Admin',
  lastLogin: '2017-05-02T07:40:18.1538029+00:00',
  email: 'admin@master-ui.com',
  profilePhoto: null,
  twitterId: '@masterui',
  skypeId: 'masterui',
  whatsAppId: '00000000',
  facebookId: 'masterui',
  bio: '',
  iso2: 'US',
  avatar: '',
  coverPhoto: 'unknown.jpg',
  preferences: {
	showMyLocation: true,
	shareProfileAsPublic: true,
	allowNotifications: true,
	shareWhatsAppId: true,
	shareSkypeId: true,
	shareTwitterId: true,
	shareFacebookId: true,
	dateFormat: 'ddd, MMM d, yyyy',
	timezoneId: 56,
	utcOffset: 12.0,
	coverPhoto: 'unknown.jpg',
	avatar: 'unknownd',
  },
  status: {
	userId: 0,
	statusId: 1,
	availability: 'Online',
	message: null,
  },
};

const defaultProps = { 
	user, 
	title: 'Master UI',
	routes: menu['items'],
	activeRoute: '',
	onLogout: jest.fn(),
	onTogglePanel: jest.fn(),
};

function setup (props, test) {
	return () => test(
		Renderer.create(
			<Header {...props} />
		)
	);
}

describe('Header Component Rendering', () => {
	it('Should exist', () => {
		expect(Header).not.toBeNull();
	});

	it('Should render something if it receives required props', setup(
		defaultProps,
		(component) => expect(component.toJSON()).toMatchSnapshot()
	));	
});

describe('Header behaviour', () => {
	it('should pass a selected value to the onClick handler', setup(
		defaultProps,
		() => {
			const wrapper = shallow(<Header {...defaultProps} />);
			expect(wrapper).toMatchSnapshot();
		}
	));	
})