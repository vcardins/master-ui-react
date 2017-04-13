import EntityModel from '../models/EntityModel';
import AccessLevel from './AccessLevel';
import * as _ from 'lodash';

interface IUserProfile {
  id: any;
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  admin: boolean;
  accessLevel: AccessLevel;
  email: string;
  phoneNumber: string;
  picture: string; 
}

export default class UserProfile extends EntityModel {
  id: any = null;
  username: string = null;
  firstName: string = null;
  lastName: string = null;
  address: string = null;
  city: string = null;
  admin: boolean = false;
  accessLevel: AccessLevel = new AccessLevel();
  email: string = null;
  phoneNumber: string = null;
  picture: string = null;

  constructor(model?: any) {
    super();
    if (model) { 
      _.merge(this, model); 
    }
  }

  get fullName(){
    return (this.firstName) ? (`${this.firstName}` + (this.lastName ? ' ' + this.lastName : '')) : undefined;
  }

  get displayName(){
    return (this.firstName) ? (`${this.firstName}` + (this.lastName ? ' ' + this.lastName.substring(0, 1) : '')) : undefined;
  }
}
