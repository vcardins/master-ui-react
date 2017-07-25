namespace Utils {

	export function setHashKey(obj, h) {
		if (h) {
			obj.$$hashKey = h;
		} else {
			delete obj.$$hashKey;
		}
	}

	export function baseExtend(target, objs, deep) {
		let h = target.$$hashKey;

		for (let i = 0, ii = objs.length; i < ii; ++i) {
			let obj = objs[i];
			if (!isObject(obj) && !isFunction(obj)) {
				continue;
			}
			let keys = Object.keys(obj);
			for (let j = 0, jj = keys.length; j < jj; j++) {
				let key = keys[j], src = obj[key];

				if (deep && isObject(src)) {
					if (!isObject(target[key])) {
						target[key] = Array.isArray(src) ? [] : {};
					}
					baseExtend(target[key], [src], true);
				} else {
					target[key] = src;
				}
			}
		}
		setHashKey(target, h);
		return target;
	}

	export function isDefined(value: any) {
		return typeof value !== 'undefined';
	}

 	export function isUndefined(value: any) {
		return typeof value === 'undefined';
	}

	export function camelCase(name: string) {
		return name.replace(/([\:\-\_]+(.))/g, function(_, separator, letter, offset) {
		  return offset ? letter.toUpperCase() : letter;
		});
	}

	export function isString(value: any) {
		return typeof value === 'string';
	}

	export function isObject (value: any) {
		return value !== null && typeof value === 'object';
	}

	export function isFunction (value: any) {
		return typeof value === 'function';
	}

	export function checkDomain(url: string) {
		if (url.indexOf('//') === 0 ) {
			url = location.protocol + url;
		}
		return url.toLowerCase().replace(/([a-z])?:\/\//, '$1').split('/')[0];
	}

	export function isExternalLink(url: string) {
		return ( ( url.indexOf(':') > -1 || url.indexOf('//') > -1 ) && checkDomain(location.href) !== checkDomain(url) );
	}

	// http://stackoverflow.com/a/1054862/725866
	export function titleToSlug(text: string) {
		return text
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-');
	}

	export function joinUrl  (baseUrl: string, url: string) {
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

	export function isBlankObject  (value) {
		return value !== null && typeof value === 'object' && !Object.getPrototypeOf(value);
	}

	export function isArrayLike (obj) {
		if (obj == null || isWindow(obj)) {
			return false;
		}
	}

	export function isWindow(obj) {
	  return obj && obj.window === obj;
	}

	export function extend2 (...dst: any[]) {
		return baseExtend(dst[0], arguments[1], false);
	}

	export function merge (...dst: any[]) {
		return baseExtend(dst[0], [].slice.call(arguments, 1), true);
	}

	export function getObjectProperties (source: any, props: any[], target: any) {
		let obj = target || {};
		if (props === null) { return obj; }
		props.forEach(prop => {
			if (source.hasOwnProperty(prop)) {
				obj[prop] = source[prop];
			}
		});
		return obj;
	}

	export function areEqual (obj1, obj2) {
		return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
	}

	export function groupArray (data, groupByProp, keyProp, transform) { 
		return data
			.reduce((r, item) => {
				const parentItem = r.find((i) => i[keyProp] === item[groupByProp]);
				if (!parentItem) {
					if (!item[groupByProp]) {
						r.push(Object.assign({}, item, transform(item), {children: []}));	
					} 
				}
				else {
					parentItem.children.push(item);
				}
				return r;
			}, []);
	}
	// const groupedCategories = groupArray(data, 'parentCategoryId', 'id', ({id, name}) => (
	// 		{ name: `${capitalize(name)}`}
	// 	));
}

export default Utils;
