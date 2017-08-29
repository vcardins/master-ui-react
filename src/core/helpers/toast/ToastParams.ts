import ToastPosition from './ToastPosition';

// Levels
const LEVELS = {
	success: 'Success',
	error: 'Error',
	warning: 'Warning',
	info: 'Information',
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

class ToastParams {
	id: string = `toast-${getRandomInt(0, 99999)}`;
	title: string;
	message: string;
	level?: string;
	position: string = ToastPosition.topRight;
	autoDismiss: number = 5;
	dismissible: boolean = true;
	action: string = '';

	constructor(level: string = LEVELS.info) {
		this.level = level;
		this.title = LEVELS[level];
	}
}

export default ToastParams;
