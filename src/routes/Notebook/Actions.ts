import { Api } from 'core/helpers';

const Actions = {
    getAll: (page: number = 1, size: number = 999) => Api.get('notebook'),
    save: (model: any, isNew: boolean) => Api[isNew ? 'post' : 'put']('notebook', model),
};

export default Actions;
