import axios from 'axios'; // https://github.com/mzabriskie/axios

import settings from '../settings';
import Utils from './Utils';
import { UserAuth } from '../auth';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export default class Api {
  
  private static _isPlainRequest: boolean;

  /**
    * Action method to get count of certain end point objects.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {{}}        parameters  Used query parameters
    *
    * @returns {Promise|*}
    */
  public static count(route: string, data: any) {
    return this.get(route + '/count', data);
  }

  public static find(route: string, prop: string, value: any): Promise<any> {
    return this.get(route, 'GET').then(data => {
      return data.filter((item: any) => {
        return item[prop] === value;
      })[0];
    });
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
  public static get(route: string, data: any = undefined, contentType: any = null, anonymous: boolean = false): Promise<any> {
    return this.request(route, 'GET', data, contentType, anonymous);
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
  public static getById(route: string, identifier: any, contentType: any = null, anonymous: boolean = false): Promise<any> {
    return this.request(route + '/' + identifier, 'GET', undefined, anonymous);
  }

  /**
    * Action method to create new object to specified end point.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {{}}        data        Data to update
    *
    * @returns {Promise|*}
    */
  public static post(route: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
    return this.request(route, 'POST', data, contentType, anonymous);
  }

  public static patch(route: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
    return this.request(route, 'PATCH', data, contentType, anonymous);
  }

  public static upload(route: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
    return this.request(route, 'UPLOAD', data, contentType, anonymous);
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
  public static put(route: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
    return this.request(route, 'PUT', data, contentType, anonymous);
  }

  /**
    * Action method to delete specified object.
    *
    * @param   {string}    endPoint    Name of the end point
    * @param   {number}    identifier  Identifier of endpoint object
    *
    * @returns {Promise|*}
    */
  public static delete(route: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
    return this.request(route, 'DELETE', data, null, anonymous);
  }

  public static plainRequest(route: string, httpRequestType: string, data: any = null, contentType: any = null, anonymous: boolean = false): Promise<any> {
    this._isPlainRequest = true;
    return this.request(route, httpRequestType, data, contentType, anonymous);
  }

  private static request(route: string,
          httpRequestType: string,
          data: any = {},
          contentType: any = null,
          isAnonymous: boolean = false): Promise<any> {
        let url = this._urlCompile(route, data, true);
        
        contentType = contentType || settings.api.contentType;

        if (typeof (data) === 'object' && data.constructor.name === 'FormData') {
          contentType = null;
        }

        let configRequest = {
            data: null,
            method : httpRequestType,
            headers: { 'Content-Type': contentType },
        };

        switch (httpRequestType) {
          case 'GET':
          case 'DELETE':
            const params = this.getParams(data);
            if (params) {
              url += '?' + params;
            }
            break;
          case 'PUT':
          case 'PATCH':
          case 'POST':
            if (data.constructor.name === 'FormData') {
              configRequest.data = new FormData(data);
            } else {
              configRequest.data = typeof(data) === 'object' ? JSON.stringify(data) : data;
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

        return new Promise((resolve, reject) => {
          axios(url, configRequest)
              .then(({data}: any) => resolve(data))
              .catch(({response}: any) => reject(response.data));
        });
    }

    private static getParams(obj: any, parameters: string[] = []): string {
      return Object.keys(obj).reduce((qs, prop) => {
          if (!parameters.length || (parameters.length > 0 && parameters[prop])) {
              qs.push(`${encodeURIComponent(prop)}=${encodeURIComponent(obj[prop])}`);
          }
          return qs;
      }, []).join('&');
    }

    private static _urlCompile(url: string, parameters: any, isReplace: boolean): string {
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
      let result = settings.api.url + (this._isPlainRequest ? '' :  `/${settings.api.prefix}`) + `/${url}`;
      this._isPlainRequest = false;
      return result;
    }
}
