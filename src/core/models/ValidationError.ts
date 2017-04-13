export default class ValidationError extends Error {
    type: string;
    field: string;
    constructor (message: string, type: string = '', field: string = '') {
        super(message);
        this.field = field;
        this.type = type;
    }
}
