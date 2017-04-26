import { Api } from 'core/helpers';
// https://github.com/facebook/emitter
import { EventEmitter } from 'fbemitter';
import State from 'state';

class DataStore<T> {

    private emitter: any = new EventEmitter();
    private endpoint: string = null;
    private rootCursor: any;
    private ajaxCursor: any;
    private modelsCursor: any;
    private modelCursor: any;

    // Initialize default values.
    model: T;
    models: Array<T>;

    // Cache parameters
    cache: any = {
        count: {},
        fetch: {},
        load: {},
    };

    // Is scope used with data model or not, if yes this is actual scope
    scope: boolean = false;

    // Scope item names for single, collection and count
    itemNames: any = {
        model: false,
        models: false,
        count: false,
    };

    // destinationPath.concat(['models']) 
    /**
    * Constructor for actual data model.
    *
    * @param   {string}  [endpoint]  Name of the API endpoint
    * @constructor
    */
    constructor(endpoint: string, branch: string, key: string = 'id') {
        // Subscribe to specified endpoint
        if (!endpoint) {
            throw Error('Data Store domain needs to be set');
        }
        this.endpoint = endpoint;
        this._subscribe();
        
        this.modelsCursor = State.select([branch].concat('models'));
        this.modelCursor = State.select([branch].concat('model'));
        this.rootCursor = State.select();
        this.ajaxCursor = this.rootCursor.select('ajax');
    }

    clearCache(): void {
        this.models = [];
        console.info('Cache Cleared: ' + this.endpoint);
    }

    setEndpoint(endpoint: string): void {
        this.endpoint = endpoint;
        this._subscribe();
    }

    find(identifier: any, parameters?: any): Promise<T> {

         let self = this;
         let url = `${this.endpoint}` + (identifier ? `/${identifier}` : '');
         return Api
            .get(url, parameters)
            .then(
              function onSuccess(response) {
                self.model = Array.isArray(response) ? response[0] : response;
                return self.model;
              },
              function onError(error) {
                console.error('DataModel.load() failed.', error, self.endpoint);
              },
            );
    }

    private setProgress (inProgress: boolean) {
        this.ajaxCursor.set('loading', inProgress);
    }

    private setError (error: Error) {
        this.ajaxCursor.set('error', error);
    }

    private loadModels(params: any = {}, endpoint: string = null, cursor: any): Promise<T | Array<T>> {
        this.setProgress(true);
        return Api
            .get(endpoint || this.endpoint, params)
            .then((response) => {
                cursor.set(response);
                this.setProgress(false);
                State.commit();    
                return response;
            })
            .catch(this.setError);        
    }

    getSingle(params: any = {}, endpoint: string = null, isSingleModel: boolean = false): Promise<Array<T>> {
        return this.loadModels(params, endpoint, this.modelCursor);
    }

    get(params: any = {}, endpoint: string = null, isSingleModel: boolean = false): Promise<Array<T>> {
        return this.loadModels(params, endpoint, this.modelsCursor);
    }

    save(data: T, identifier?: any) {
        let p = (!identifier) ?
                Api.post(this.endpoint, data) :
                Api.put(`${this.endpoint}/${identifier}`, data);

        return p.then((result: any) => {return result; })
                 .catch((error: any) => {
                    console.error('DataModel.create() failed.', error, this.endpoint, data);
                  });
    }

    upload(files: any, route: string, identifier?: any) {
        let url = this.endpoint;
        url += (identifier ? '/' + identifier : '');
        url += '/' + (route || 'upload');

        return Api.upload(url, files)
               .then((result) => {
                 return result;
               })
               .catch((error) => {
                  console.error('DataModel.upload() failed.', error, this.endpoint, files);
               });
    }

    private _subscribe() {
        this.emitter.addListener('auth:logout:success', this.clearCache.bind(this));
    }

    private _unsubscribe() {

    }
}

export default DataStore;
