namespace CookieStorage {

  export function get(key: string): any {
		const keyX = key + '=';
		const ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(keyX) === 0) {
				return c.substring(keyX.length, c.length);
			}
			return null;
		}
	}

	export function set(key: string, value: any, time: any): void {
		let expires = '';
		if (time) {
			const date = new Date();
			date.setTime(date.getTime() + (time * 24 * 60 * 60 * 1000));
			expires = '; expires=' + date.toUTCString();
		}
	 	document.cookie = `${key}=${value}${expires}; path=/`;
	}

	export function remove(key: string): void {
		this.set(key, '', new Date(-1));
	}

}

export default CookieStorage;
