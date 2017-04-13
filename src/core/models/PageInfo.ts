import * as _ from 'lodash';
export default class PageInfo {
    name: string = '';
    title: string = '';
    description?: string = '';
    icon?: string = '';
    breadcrumb?: string = '';
    headerless: boolean = false;
    
    constructor(config?: any) {
        if (config) { 
            _.merge(this, _.pick(config, Object.keys(this))); 
        }
    }
}
