import DataStore from 'core/data/DataStore';

const lookupStore = new DataStore<any>('lookup', 'lookup');

const LookupStore: any = { 
    load(): void {
        lookupStore.get().then((lookup: any) => lookup);
    },
};

export default LookupStore;
