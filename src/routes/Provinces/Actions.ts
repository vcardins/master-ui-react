import { Api } from 'core/helpers';

const Actions = {
    getAll: (iso2: string, page: number = 1, size: number = 999) => Api.get(`geo/states?page=${page}&size=${size}&iso2=${iso2}`),
    save: (model: any, isNew: boolean) => Api[isNew ? 'post' : 'put']('geo/states', model),
};

export default Actions;
