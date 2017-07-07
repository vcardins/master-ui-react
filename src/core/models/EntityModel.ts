import { merge } from 'lodash';

export default class EntityModel {

  isInEditMode: boolean = false;
  required: Array<string> = [];
  validation: any; // Validation
  _previousValues: EntityModel;

  constructor(model? : any) {
	if (model) { 
	  merge(this, model); 
	}
	this.isInEditMode = true;
	this.isValid = this.isValid.bind(this);
	this.setEditMode = this.setEditMode.bind(this);
	this.get = this.get.bind(this);
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
	  this._previousValues = this.get();
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

  get (onlyFilled: boolean = null) {
	let result: any = {};
	for (let prop in this) {
	  if (this.hasOwnProperty(prop) && result.hasOwnProperty(prop)) {
		if (!this[prop] && onlyFilled) { continue; }
		result[prop] = this[prop];
	  }
	}
	delete result.isInEditMode;
	delete result.validation;
	delete result._previousValues;

	return result;
  }
}
