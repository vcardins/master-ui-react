import { Api } from 'core/helpers';

const Actions = {
    getAll: async (page: number = 1, size: number = 999) => await Api.get('notebook'),
    save: async (model: any, isNew: boolean) => await Api[isNew ? 'post' : 'put']('notebook', model),
};

export default Actions;
