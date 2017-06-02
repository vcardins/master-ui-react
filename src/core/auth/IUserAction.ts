import UserProfile from './UserProfile';

interface IUserAction {
    loadProfile(): void;
    updateProfile(data: UserProfile): Promise<UserProfile>;
    signup(data: any): Promise<any>;
    verifyAccount(data: any): Promise<any>;
    changeEmail(data: any): Promise<any>;
    changeMobile(data: any): Promise<any>;
    changeAddress(data: any): Promise<any>;
    changePassword(data: any): Promise<any>;
    isUsernameAvailable(username: string): Promise<any>;
    isEmailAvailable(email: string): Promise<any>;
    isPhoneNumberAvailable(phoneNumber: string): Promise<any>;
    resetPassword(data: any): Promise<any>;
    requestUsernameChange(data: any): Promise<any>;
    requestEmailChange(data: any): Promise<any>;
}

export default IUserAction;
