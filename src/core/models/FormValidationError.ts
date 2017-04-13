export interface IFormValidationError {
    key: string;
    value: Array<string>
}

export default class FormValidationError {
    errors: Array<IFormValidationError> = [];

    constructor (errors?: any) {
        console.log(errors);
      // Array<IFormValidationError>
    }
}
