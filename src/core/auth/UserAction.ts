import UserProfile from './UserProfile';
import IUserAction from './IUserAction';
import UserSignup from './UserSignup';
import AccessLevel from './AccessLevel';
import ActionResult from 'core/models/ActionResult';
import { Api } from 'core/helpers';
import settings from 'core/settings';

const UserAction: IUserAction = { 

    async getProfile(): Promise<UserProfile> {
        const profile = await Api.get('profile');
        return new UserProfile(profile);
    },

    async updateProfile(data: UserProfile): Promise<UserProfile> {
        const profile = await Api.patch('profile');
        return new UserProfile(profile);
    },

    async signup(data: any): Promise<any> {
        const response = await Api.post('account/register');
        const apiResponse: ActionResult = new ActionResult();
        apiResponse.redirect = settings.defaultRoute;
        apiResponse.message = response.message;
        return apiResponse;
    },

    async verifyAccount(data: any): Promise<any> {
         return await Api.patch('account/verifyAccount', data);
    },

    async changeEmail(data: any): Promise<any> {
        return await Api.patch('account/changeEmail', data);
    },

    async changeMobile(data: any): Promise<any> {
        return await Api.patch('account/changeMobile', data);
    },

    async changeAddress(data: any): Promise<any> {
        return await Api.patch('account/changeAddress', data);
    },

    async changePassword(data: any): Promise<any> {
        return await Api.patch('account/changePassword', data);
    },

    async isUsernameAvailable(username: string): Promise<any> {
         return await Api.get('account/isUsernameAvailable', { username });
    },

    async isEmailAvailable(email: string): Promise<any> {
        return await Api.get('account/isEmailAvailable', { email });
    },

    async isPhoneNumberAvailable(phoneNumber: string): Promise<any> {
        return await Api.get('account/isPhoneNumberAvailable', { phoneNumber });
    },

    async resetPassword(data: any): Promise<any> {
        return await Api.post('account/reset-password', data);
    },

    async requestUsernameChange(data: any): Promise<any> {
        return await Api.post('account/request-username-change', data);
    },

    async requestEmailChange(data: any): Promise<any> {
        return await Api.post('account/request-email-change', data);
    },
};

export default UserAction;
