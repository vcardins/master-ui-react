import config from 'config';
import { LocalStorageTypes, AuthenticationTypes } from '../enums';
import * as _ from 'lodash';

export interface IApiSettings {
  url: string;
  prefix: string;
  contentType: string;
  clientId: string;
  clientSecret: string;
  loginUrl: string;
  resetPasswordUrl: string;
  signupUrl: string;
  profileUrl: string;
  unlinkUrl: string;
  unlinkMethod: string;
  grantType:  string;
}

export interface ISignalRSettings {
  id: string;
  logging: boolean;
  messageId: string;
  host: string;
}

export interface IApplicationSettings {
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
	providers: any; // Object<string, IAuthProvider>;
}

class ApplicationSettings {

  instance: any;
  time: Date;

  constructor(config) {
    
    const defaultConfig = {
      title: '',
      description: '',
      name: '',
      version: '',
      year: ((new Date()).getFullYear()),
      playSounds: false,
      lockScreenTimeout: 1,
      defaultRoute: '',
      api : {
        url: '/',
        prefix: '',
        contentType: 'application/json',
        grantType: 'password',
        clientId: null,
        clientSecret: null,
        unlinkUrl: '/auth/unlink/',
        unlinkMethod: 'get',        
      },
      isInDebugMode: false,
      localStorageMode: LocalStorageTypes.Local,
      authenticationMode: AuthenticationTypes.Local,
      authorizationScope: 'openid',
      httpInterceptor: true,
      loginOnSignup: true,
      loginRedirect: '/login',
      logoutRedirect: '/logout',
      signupRedirect: '/signup',
      loginRoute: 'login',
      signupRoute: 'signup',
      tokenRoot: '',
      tokenName: 'token',
      tokenPrefix: '',
      authHeader: 'Authorization',
      authToken: 'Bearer',
      withCredentials: true,
      platform: 'browser',
      providers: {
        google: {
          name: 'google',
          title: 'Google',
          url: '/auth/google',
          authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['profile', 'email'],
          scopePrefix: 'openid',
          scopeDelimiter: ' ',
          requiredUrlParams: ['scope'],
          optionalUrlParams: ['display'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 452, height: 633 },
        },
        facebook: {
          name: 'facebook',
          title: 'Facebook',
          url: '/auth/facebook',
          authorizationEndpoint: 'https://www.facebook.com/v2.3/dialog/oauth',
          redirectUri: window.location.origin + '/' || window.location.protocol + '//' + window.location.host + '/',
          scope: ['email'],
          scopeDelimiter: ',',
          nonce: function() {
            return Math.random();
          },
          requiredUrlParams: ['nonce', 'display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 580, height: 400 },
        },
        linkedin: {
          name: 'linkedin',
          title: 'Linkedin',
          url: '/auth/linkedin',
          authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          requiredUrlParams: ['state'],
          scope: ['r_emailaddress'],
          scopeDelimiter: ' ',
          state: 'STATE',
          type: '2.0',
          popupOptions: { width: 527, height: 582 },
        },
        github: {
          name: 'github',
          title: 'GitHub',
          url: '/auth/github',
          authorizationEndpoint: 'https://github.com/login/oauth/authorize',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          optionalUrlParams: ['scope'],
          scope: ['user:email'],
          scopeDelimiter: ' ',
          type: '2.0',
          popupOptions: { width: 1020, height: 618 },
        },
        yahoo: {
          name: 'yahoo',
          title: 'Yahoo',
          url: '/auth/yahoo',
          authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: [],
          scopeDelimiter: ',',
          type: '2.0',
          popupOptions: { width: 559, height: 519 },
        },
        twitter: {
          name: 'twitter',
          title: 'Twitter',
          url: '/auth/twitter',
          authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
          type: '1.0',
          popupOptions: { width: 495, height: 645 },
        },
        live: {
          name: 'live',
          title: 'Microsoft Live',
          url: '/auth/live',
          authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
          redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
          scope: ['wl.emails'],
          scopeDelimiter: ' ',
          requiredUrlParams: ['display', 'scope'],
          display: 'popup',
          type: '2.0',
          popupOptions: { width: 500, height: 560 },
        },
      },
    };
    
    this.instance = _.merge(defaultConfig, config);
    this.time = new Date();
  }
}

const settings = new ApplicationSettings(config).instance;

export default settings;
