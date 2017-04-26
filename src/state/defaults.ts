import { monkey } from 'baobab';

const defaultFilters = {
	pageSize: 100,
	pageNumber: 0,
};

function defaultDataset (extras = {}) {
	return Object.assign({
		models: [],
		modelsMap: {},
		localFilters: Object.assign({}, defaultFilters),
		filters: monkey({
			cursors: {
				globalFilters: ['globalFilters'],
				localFilters: ['.', 'localFilters'],
			},
			get ({ globalFilters, localFilters }) {
				return Object.assign({}, globalFilters, localFilters);
			},
		}),
		checked: [],
		highlighted: [],
		selection: {},
	}, extras);
}

// Default state values
const coreState = {
	// General App State
	appVersion: null,
	isAppVersionUpdated: false,
	loading: false,
	preload: true,
	debugModeOn: process.env.NODE_ENV !== 'production',
	user: {},
	lookup: {},
	pendingUpdates: {},
};

const StateDefaults = Object.assign({}, coreState);

export default StateDefaults;
