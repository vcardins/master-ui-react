import { Api } from 'core/helpers';

const Actions = {
	getCountries: async () => await Api.get('geo/countries'),
};

export default Actions;
