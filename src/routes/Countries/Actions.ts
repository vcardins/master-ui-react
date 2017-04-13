import { Api } from 'core/helpers';

const Actions = {
    getCountries: () => Api.get('geo/countries'),
};

export default Actions;
