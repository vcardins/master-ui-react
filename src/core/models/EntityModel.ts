import * as _ from 'lodash';

export default class EntityModel {

  isInEditMode: boolean = false;
  required: Array<string> = [];
  validation: any; // Validation
  _previousValues: EntityModel;

  constructor(model? : any) {
    if (model) { 
      _.merge(this, model); 
    }
    // if (required) {
    //   this.required = required;
    // }
    this.isInEditMode = true;
    this.isValid = this.isValid.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.getOwnProperties = this.getOwnProperties.bind(this);
  }

  isValid() : boolean {
    const self = this;

    if (self.required.length > 0) {
      return self.required.reduce((result: any, prop: string) => {
        if ( self.hasOwnProperty(prop) ) {
          result = result && self[prop];
        }
        return result;
      }, true);
    }
    return true;
  }

  setEditMode(edit: boolean) {
    this.isInEditMode = edit;
    if (edit) {
      this._previousValues = this.getOwnProperties();
    } else {
      this._previousValues = undefined;
    }
  }

  revertChanges() {
    if (this.isInEditMode) {
      Object.assign(this, this._previousValues);
      this.setEditMode(false);
    }
  }

  getOwnProperties(onlyFilled: boolean = null) {
    const result: EntityModel = new EntityModel();
    for (let prop in this) {
      if (this.hasOwnProperty(prop) && result.hasOwnProperty(prop)) {
        if (!this[prop] && onlyFilled) { continue; }
        // result[prop] = this[prop];
      }
    }
    delete result.isInEditMode;
    delete result.validation;
    delete result._previousValues;

    return result;
  }
}
