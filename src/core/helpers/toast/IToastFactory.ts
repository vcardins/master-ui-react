import ToastParams from './ToastParams';

interface IToastFactory {
	info: (params: ToastParams | string) => void;
	success: (params: ToastParams | string) => void;
	warning: (params: ToastParams | string) => void;
	error: (params: ToastParams | string) => void;
}

export default IToastFactory;
