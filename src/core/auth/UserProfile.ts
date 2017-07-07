import EntityModel from 'core/models/EntityModel';
import AccessLevel from './AccessLevel';

export default class UserProfile extends EntityModel {
  iuserId:  number;
  username: string;
  firstName: string;
  lastName: string;
  accessLevel: AccessLevel = new AccessLevel();
  email: string;
  phoneNumber: string;
  avatar: string;
  twitterId: string;
  skypeId: string;
  whatsAppId: string;
  facebookId: string;
  bio: string;
  iso2: string;
  // preferences:  {
  //   showMyLocation:  true,
  //   shareProfileAsPublic:  true,
  //   allowNotifications:  true,
  //   shareWhatsAppId:  true,
  //   shareSkypeId:  true,
  //   shareTwitterId:  true,
  //   shareFacebookId:  true,
  //   dateFormat: 'ddd, MMM d, yyyy',
  //   timezoneId:  56,
  //   utcOffset:  12.0,
  //   coverPhoto: 'maple-leaves-background.jpg',
  //   avatar: 'hair-black-eyes-blue-green-skin-tanned',
  //   favoriteCityId:  3801,
  //   targetCountry: 'CA',
  // },
  // status:  {
  //   userId:  0,
  //   statusId:  1,
  //   availability: 'Online',
  //   message:  null
  // }

  constructor(model?: any) {
	super(model);
  }

  get fullName(){
	return (this.firstName) ? (`${this.firstName}` + (this.lastName ? ' ' + this.lastName : '')) : undefined;
  }

  get displayName(){
	return (this.firstName) ? (`${this.firstName}` + (this.lastName ? ' ' + this.lastName.substring(0, 1) : '')) : undefined;
  }
}
