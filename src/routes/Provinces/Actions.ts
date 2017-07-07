import { Api } from 'core/helpers';

const Actions = {
	getAll: async (iso2: string, page: number = 1, size: number = 999) => await Api.get(`geo/states?page=${page}&size=${size}&iso2=${iso2}`),
	save: async (model: any, isNew: boolean) => await Api[isNew ? 'post' : 'put']('geo/states', model),
};

export default Actions;
