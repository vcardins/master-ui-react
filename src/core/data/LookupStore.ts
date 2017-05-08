import DataStore from 'core/data/DataStore';

module LookupStore { 
    const lookupStore = new DataStore<any>('lookup', 'lookup');

    export function load() {
        return lookupStore.get();
    } 
}

export default LookupStore;
