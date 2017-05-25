import nanoajax from 'nanoajax';  // https://github.com/yanatan16/nanoajax
import settings from 'core/settings';
import { UserAuth } from '../auth';

namespace Api {
	
	let _isPlainRequest: boolean = false;

	/**
		* Action method to get count of certain end point objects.
		*
		* @param   {string}    endPoint    Name of the end point
		* @param   {{}}        parameters  Used query parameters
		*
		* @returns {Promise|*}
		*/
	export async function count(route: string, data: any) {
		return get(route + '/count', data);
	}

	export async function find(route: string, prop: string, value: any): Promise<any> {
		const data: string[] = await get(route, 'GET');
		return data.filter((item: any) => item[prop] === value)[0] || {};
	}

	/**
		* Action method to get data from certain end point. This will always return a collection
		* of data.
		*
		* @param   {string}    endPoint    Name of the end point
		* @param   {{}}        parameters  Used query parameters
		*
		* @returns {Promise|*}
		*/
	export function get(route: string, data: any = undefined, contentType: any = null, anonymous: boolean = false): Promise<any> {
		return request(route, 'GET', data, contentType, anonymous);
	}

	/**
		* Action method to get data from certain end point. This will always return a collection
		* of data.
		*
		* @param   {string}    endPoint    Name of the end point
		* @param   {{}}        parameters  Used query parameters
		*
		* @returns {Promise|*}
		*/
	export function getById(route: string, identifier: any, contentType: any = null, anonymous: boolean = false): Promise<any> {
		return request(route + '/' + identifier, 'GET', undefined, anonymous);
	}

	/**
		* Action method to create new object to specified end point.
		*
		* @param   {string}    endPoint    Name of the end point
		* @param   {{}}        data        Data to update
		*
		* @returns {Promise|*}
		*/
	export function post(route: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
		return request(route, 'POST', data, contentType, anonymous);
	}

	export function patch(route: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
		return request(route, 'PATCH', data, contentType, anonymous);
	}

	export function upload(route: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
		return request(route, 'UPLOAD', data, contentType, anonymous);
	}

	/**
		* Action method to update specified end point object.
		*
		* @param   {string}    endPoint    Name of the end point
		* @param   {number}    identifier  Identifier of endpoint object
		* @param   {{}}        data        Data to update
		*
		* @returns {Promise|*}
		*/
	export function put(route: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
		return request(route, 'PUT', data, contentType, anonymous);
	}

	/**
		* Action method to delete specified object.
		*
		* @param   {string}    endPoint    Name of the end point
		* @param   {number}    identifier  Identifier of endpoint object
		*
		* @returns {Promise|*}
		*/
	export function remove(route: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
		return request(route, 'DELETE', data, null, anonymous);
	}

	export function plainRequest(route: string, method: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
		_isPlainRequest = true;
		return request(route, method, data, contentType, anonymous);
	}

	function request(route: string, method: string, body: any = {}, contentType: any = null, isAnonymous: boolean = false): Promise<any> {
		let url = _urlCompile(route, body, true);
		
		contentType = contentType || settings.api.contentType;

		if (typeof (body) === 'object' && body.constructor.name === 'FormData') {
			contentType = null;
		}

		let configRequest = {
			body: null,
			method : method,
			headers: { 'Content-Type': contentType },
		};

		switch (method) {
			case 'GET':
			case 'DELETE':
				const params = getParams(body);
				if (params) {
					url += '?' + params;
				}
				break;
			case 'PUT':
			case 'PATCH':
			case 'POST':
				if (body.constructor.name === 'FormData') {
					configRequest.body = new FormData(body);
				} else {
					configRequest.body = typeof(body) === 'object' ? JSON.stringify(body) : body;
				}
				break;
		}

		if (!isAnonymous) {
			if (settings.authHeader && settings.authToken) {
				let token = UserAuth.token;
				let authHeader = `${settings.authToken} ${token}`;
				configRequest.headers[settings.authHeader] = authHeader;
			}
		}
		
		const request = Object.assign({}, configRequest, { url });

		return new Promise((resolve, reject) => {
			return nanoajax.ajax(request, (code, response, xmlHttpRequest) => {
				console.log(code);
				if (code === 204) { 
					resolve();
				}
				try {
					const apiResponse = JSON.parse(response);
					const codeExplanation = code ? `responses: ${code}` : 'parameters: in: body';
					switch (code) {
						case 400:
						case 401:								
							reject(new Error(apiResponse.message));
							break;
					}
					resolve(apiResponse);
				} catch (e) {
					reject(new Error(`Request response is not a valid JSON ${url}: ${request.method}: ${e.message}`));
				}
			});
		});
	}

	function getParams(obj: any, parameters: string[] = []): string {
		return Object.keys(obj).reduce((qs, prop) => {
				if (!parameters.length || (parameters.length > 0 && parameters[prop])) {
						qs.push(`${encodeURIComponent(prop)}=${encodeURIComponent(obj[prop])}`);
				}
				return qs;
		}, []).join('&');
	}

	function _urlCompile(url: string, parameters: any, isReplace: boolean): string {
		if (!url) { return; }
		
		if (Array.isArray(url)) { url = url[0]; }
		for (let name in parameters) {
				if (url.indexOf(':' + name) > -1) {
						let value = parameters[name];
						if (!value) {
								console.error('Router: No path replacement value for ' + name + '.', url, parameters);
						}
						url = url.replace(':' + name, value);
						if (isReplace) {
								delete parameters[name];
						}
				}
		}
		let result = settings.api.url + (_isPlainRequest ? '' :  `/${settings.api.prefix}`) + `/${url}`;
		_isPlainRequest = false;
		return result;
	}

	function checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} else {
			const error = new Error(response.statusText);
			throw error;
		}
	}

	function parseJSON(response) {
		return JSON.parse(response);
	}
}

export default Api;
