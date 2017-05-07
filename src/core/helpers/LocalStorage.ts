import appSettings from 'core/settings';
import { LocalStorageTypes } from 'core/enums';

export interface IStorage {
	getItem(key: string): any;
	setItem(key: string, value: any): void;
	removeItem(key: string): void;
}

namespace LocalStorage {

	let storage: any = {};

	(function init() {
		switch (appSettings.localStorageMode) {
			case LocalStorageTypes.Local:
				storage = window.localStorage;
				if (!('localStorage' in window && window.localStorage !== null)) {
					console.warn('Warning: Local Storage is disabled or unavailable');
				}
				break;
			case LocalStorageTypes.Session:
				storage = window.sessionStorage;
				if (!('sessionStorage' in window && window.sessionStorage !== null)) {
					console.warn('Warning: Session Storage is disabled or unavailable. Will not work correctly.');
				}
			break;
		}
	}());

	export function get(key: string): any {
		return storage.getItem(key);
	}

	export function set(key: string, value: any): any {
		return storage.setItem(key, value);
	}

	export function remove(key: string): any {
		return storage.removeItem(key);
	}

}

export default LocalStorage;
