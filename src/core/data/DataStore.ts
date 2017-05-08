import { Api } from 'core/helpers';
// https://github.com/facebook/emitter
import { EventEmitter } from 'fbemitter';
import State from 'state';

class DataStore<T> {

    private emitter: any = new EventEmitter();
    private endpoint: string = null;
    private rootCursor: any = State.select();
    private ajaxCursor: any = this.rootCursor.select('ajax');
    private modelsCursor: any;
    private modelCursor: any;

    // Initialize default values.
    public model: T;
    public models: Array<T>;

    // Cache parameters
    private cache: any = {
        count: {},
        fetch: {},
        load: {},
    };

    // Is scope used with data model or not, if yes this is actual scope
    private scope: boolean = false;

    // Scope item names for single, collection and count
    private itemNames: any = {
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
    }

    clearCache(): void {
        this.models = [];
        console.info('Cache Cleared: ' + this.endpoint);
    }

    public setEndpoint(endpoint: string): void {
        this.endpoint = endpoint;
        this._subscribe();
    }

    public async find(identifier: any, params?: any): Promise<T> {

         let self = this;
         let url = `${this.endpoint}` + (identifier ? `/${identifier}` : '');
         const response = await Api.get(url, params);
         if (response.error) {
             throw Error(response.error);
         } 
         else {
            self.model = Array.isArray(response) ? response[0] : response;
            return self.model;
         }
    }

    private async loadModels(params: any = {}, endpoint: string = null, cursor: any): Promise<T | Array<T>> {
        this.setProgress(true);
        const response = await Api.get(endpoint || this.endpoint, params);
         if (response.error) {
             this.setError(response.error);
             throw Error(response.error);
         } 
         else {
            this.setProgress(false);
            cursor.set(response);            
            State.commit();    
            return response;
         }
    }

    public async getSingle(params: any = {}, endpoint: string = null, isSingleModel: boolean = false): Promise<T | Array<T>> {
        return await this.loadModels(params, endpoint, this.modelCursor);
    }

    public async get(params: any = {}, endpoint: string = null, isSingleModel: boolean = false): Promise<T | Array<T>> {
        const models = this.modelsCursor.get();
        if (params.cached && models) {                        
            return models;
        }
        return await this.loadModels(params, endpoint, this.modelsCursor);
    }

    public async save(data: T, identifier?: string | number) {
        const url = !identifier ? this.endpoint : `${this.endpoint}/${identifier}`;
        const fn = Api[!identifier ? 'post' : 'put'];

        const response = await fn(url, data);
        
        this.setProgress(true);
        if (response.error) {
             this.setError(response.error);
             throw Error(response.error);
         } 
         else {
            this.setProgress(false);
            // this.modelsCursor.set(response);            
            // State.commit();    
            return response;
         }
    }

    public async upload(files: any, route: string, identifier?: any) {
        const url = `${this.endpoint}${identifier ? '/' + identifier : ''}/${route || 'upload'}`;
        return await Api.upload(url, files);
    }

    private setProgress (inProgress: boolean) {
        this.ajaxCursor.set('loading', inProgress);
    }

    private setError (error: Error) {
        this.ajaxCursor.set('error', error);
    }

    private _subscribe() {
        this.emitter.addListener('auth:logout:success', this.clearCache.bind(this));
    }

    private _unsubscribe() {

    }
}

export default DataStore;
