import UserProfile from './UserProfile';
import IUserAction from './IUserAction';
import UserSignup from './UserSignup';
import AccessLevel from './AccessLevel';
import ActionResult from 'core/models/ActionResult';
import { Api } from '../helpers';
import settings from '../settings';

const UserAction: IUserAction = { 

    getProfile(): Promise<UserProfile> {
        return Api.get('profile').then((profile: any) => {
            return new UserProfile(profile);
        });
    },

    updateProfile(data: UserProfile): Promise<UserProfile> {
        return Api.patch('profile').then((profile: any) => {
            return new UserProfile(profile);
        });
    },

    signIn(data: any): Promise<any> {
        return null;
    },

    signOut(data: any): Promise<any> {
       return null;
    },

    signup(data: any): Promise<any> {
         const apiResponse: ActionResult = new ActionResult();
        return Api.post('account/register', data).then((response: any) => {
            apiResponse.redirect = settings.defaultRoute;
            apiResponse.message = response.message;
            return apiResponse;
        });
    },

    verifyAccount(data: any): Promise<any> {
         return Api.patch('account/verifyAccount', data).then((response: any) => {
            return response;
        });
    },

    changeEmail(data: any): Promise<any> {
        return Api.patch('account/changeEmail', data).then((response: any) => {
            return response;
        });
    },

    changeMobile(data: any): Promise<any> {
        return Api.patch('account/changeMobile', data).then((response: any) => {
            return response;
        });
    },

    changeAddress(data: any): Promise<any> {
        return Api.patch('account/changeAddress', data).then((response: any) => {
            return response;
        });
    },

    changePassword(data: any): Promise<any> {
        return Api.patch('account/changePassword', data).then((response: any) => {
            return response;
        });
    },

    isUsernameAvailable(username: string): Promise<any> {
         return Api.get('account/isUsernameAvailable', { username }).then((response: any) => {
            return response;
        });
    },

    isEmailAvailable(email: string): Promise<any> {
        return Api.get('account/isEmailAvailable', { email }).then((response: any) => {
            return response;
        });
    },

    isPhoneNumberAvailable(phoneNumber: string): Promise<any> {
        return Api.get('account/isPhoneNumberAvailable', { phoneNumber }).then((response: any) => {
            return response;
        });
    },

    resetPassword(data: any): Promise<any> {
        return Api.post('account/reset-password', data).then((response: any) => {
            return response;
        });
    },

    requestUsernameChange(data: any): Promise<any> {
        return Api.post('account/request-username-change', data).then((response: any) => {
            return response;
        });
    },

    requestEmailChange(data: any): Promise<any> {
        return Api.post('account/request-email-change', data).then((response: any) => {
            return response;
        });
    },
};

export default UserAction;
