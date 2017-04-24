import React from 'react';
import ReactDOM from 'react-dom';
import NotificationSystem from 'react-notification-system';
import IToastFactory from './IToastFactory';
import ToastPosition from './ToastPosition';
import ToastParams from './ToastParams';

// Positions
const POSITIONS = {
	tl: 'tl',
	tr: 'tr',
	tc: 'tc',
	bl: 'bl',
	br: 'br',
	bc: 'bc',
};

// Levels
const LEVELS = {
	success: 'Success',
	error: 'Error',
	warning: 'Warning',
	info: 'Information',
};

// Notification defaults
const NOTIFICATION = {
	title: null,
	message: null,
	level: null,
	position: POSITIONS.tr,
	autoDismiss: 5,
	dismissible: true,
	action: null,
};

let notificationSystem = null;

const toastFactory = (params: any, id: any) => {
	if (!notificationSystem) {
		const element = document.createElement('div');
		const wrapper = document.body.appendChild(element);
		element.setAttribute('id', 'notificationSystem');
		notificationSystem = ReactDOM.render(NotificationSystem, wrapper);
	}

	setTimeout(() => {
		const notification = notificationSystem.addNotification({ ...NOTIFICATION, ...params });
		idify(notification, id);
	});
};

const idify = (notification: any, id: string) => {
	// Get notification DOM element and stick an id to it.
	const refs = { refs: {} };
	const containerElement = notificationSystem.refs[`container-${notification.position}`] || refs;
	const notificationElement = containerElement.refs[`notification-${notification.uid}`] || refs;
	const notificationNode = ReactDOM.findDOMNode(notificationElement);

	if (notificationNode) {
		const toastId = ['toast', notification.level, id || notification.uid];

		notificationNode.setAttribute('id', toastId.join('-'));
	}
};

const toast: IToastFactory = Object
	.keys(LEVELS)
	.reduce((toasts, level) => {
		const title = LEVELS[level];

		toasts[level] = (params: any, id) => {  // eslint-disable-line immutable/no-mutation
			const options = typeof params === 'string'
				? { message: params }
				: params;

			if (!options.message) {
				return;
			}

			return toastFactory({ level, title, ...options }, id);
		};

		return toasts;
	}, {}) as IToastFactory;

export default toast;
