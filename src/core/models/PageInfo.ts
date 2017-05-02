import { merge, pick } from 'lodash';

export default class PageInfo {
    name: string = '';
    title: string = '';
    description?: string = '';
    icon?: string = '';
    breadcrumb?: string = '';
    headerless: boolean = false;
    
    constructor(config?: any) {
        if (config) { 
            merge(this, pick(config, Object.keys(this))); 
        }
    }
}
