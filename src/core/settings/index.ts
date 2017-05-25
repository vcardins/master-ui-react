import config from '../../config';
import { LocalStorageTypes, AuthenticationTypes } from 'core/enums';
import { merge } from 'lodash';
import defaultConfig from './defaults';
import IApiSettings from './IApiSettings';

interface IApplicationSettings {
    title:  string;
    description:  string;
    name: String;
    defaultRoute : string;
    version: string;
    year: number
    lockScreenTimeout: number;
    playSounds : boolean;
    api: IApiSettings;
    // signalR:ISignalRSettings;
    localStorageMode: LocalStorageTypes,
    authenticationMode: AuthenticationTypes,
    authorizationScope: string;
    isInDebugMode: boolean;
    httpInterceptor: boolean;
    loginOnSignup: boolean;
    loginRedirect: string;
    signupRedirect: string;
    logoutRedirect: string;
    loginRoute: string;
    signupRoute: string;
    authHeader: string;
    authToken: string;
    tokenRoot: string;
    tokenName: string;
    tokenPrefix: string;
    analyticsId: string;
    withCredentials: boolean;
    platform: string;
    providers: any;
}

const settings: IApplicationSettings = merge(defaultConfig, config);

export default settings;
