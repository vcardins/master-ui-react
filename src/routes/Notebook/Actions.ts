import DataStore from 'core/data/DataStore';

class NotebookStore extends DataStore<any> {
	constructor() {
		super('notebook', 'notebook');
	}
}

export default new NotebookStore();
