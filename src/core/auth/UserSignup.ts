import EntityModel from 'core/models/EntityModel';

export default class UserSignup {
  username: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobilePhoneNumber: string = '';
  countryOfNationality: string = 'BR';
  countryOfInterest: string = 'CA';
  terms: boolean = false;
}
