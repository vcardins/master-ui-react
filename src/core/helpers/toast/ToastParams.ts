import ToastPosition from './ToastPosition';

export default class ToastParams {
    title: string;
	message: string;
	level: string;
	position: ToastPosition;
	autoDismiss: number;
	dismissible: boolean;
	action: string;
}
