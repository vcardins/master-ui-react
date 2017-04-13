export default class Utils {

	static setHashKey(obj, h) {
		if (h) {
			obj.$$hashKey = h;
		} else {
			delete obj.$$hashKey;
		}
	}

	static baseExtend(target, objs, deep) {
		let h = target.$$hashKey;

		for (let i = 0, ii = objs.length; i < ii; ++i) {
			let obj = objs[i];
			if (!this.isObject(obj) && !this.isFunction(obj)) {
				continue;
			}
			let keys = Object.keys(obj);
			for (let j = 0, jj = keys.length; j < jj; j++) {
				let key = keys[j], src = obj[key];

				if (deep && this.isObject(src)) {
					if (!this.isObject(target[key])) {
						target[key] = Array.isArray(src) ? [] : {};
					}
					this.baseExtend(target[key], [src], true);
				} else {
					target[key] = src;
				}
			}
		}
		this.setHashKey(target, h);
		return target;
	}

	static isDefined(value: any) {
		return typeof value !== 'undefined';
	}

 	static isUndefined(value: any) {
		return typeof value === 'undefined';
	}

	static camelCase(name: string) {
        return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        });
    }

	static isString(value: any) {
		return typeof value === 'string';
	}

	static isObject (value: any) {
		return value !== null && typeof value === 'object';
	}

	static isFunction (value: any) {
		return typeof value === 'function';
	}

	static checkDomain(url: string) {
		if (url.indexOf('//') === 0 ) {
			url = location.protocol + url;
		}
		return url.toLowerCase().replace(/([a-z])?:\/\//, '$1').split('/')[0];
	}

	static isExternalLink(url: string) {
		return ( ( url.indexOf(':') > -1 || url.indexOf('//') > -1 ) && this.checkDomain(location.href) !== this.checkDomain(url) );
	}

	// http://stackoverflow.com/a/1054862/725866
	static titleToSlug(text: string) {
		return text
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-');
	}

	static joinUrl  (baseUrl: string, url: string) {
		if (/^(?:[a-z]+:)?\/\//i.test(url)) {
			return url;
		}

		let joined = [baseUrl, url].join('/');

		let normalize = function(str) {
			return str
			.replace(/[\/]+/g, '/')
			.replace(/\/\?/g, '?')
			.replace(/\/\#/g, '#')
			.replace(/\:\//g, '://');
		};

		return normalize(joined);
	}

	static isBlankObject  (value) {
		return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
	}

	static isArrayLike (obj) {
		if (obj == null || this.isWindow(obj)) {
			return false;
		}
	}

	static isWindow(obj) {
	  return obj && obj.window === obj;
	}

	static extend2 (...dst: any[]) {
		return this.baseExtend(dst[0], arguments[1], false);
	}

	static merge (...dst: any[]) {
		return this.baseExtend(dst[0], [].slice.call(arguments, 1), true);
	}

	static getObjectProperties (source: any, props: any[], target: any) {
		let obj = target || {};
		if (props === null) { return obj; }
		props.forEach(prop => {
			if (source.hasOwnProperty(prop)) {
				obj[prop] = source[prop];
			}
		});
		return obj;
	}

	static areEqual(obj1, obj2) {
		return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
	}
}
