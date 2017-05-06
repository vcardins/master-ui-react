import settings from 'core/settings';
import { Api, LocalStorage } from 'core/helpers';
import { userRoles, accessLevels } from './Access';
import { ActionResult } from 'core/models';
import IAuthResponse from './IAuthResponse';

class UserAuth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static async login(identifier: string, password: string): Promise<ActionResult> {
      let self = this;
      let promise = null;

      const grantContent = `grant_type=${settings.api.grantType}`;
      const userNameContent = `${'&username='}${identifier}`;
      const passwordContent = `${'&password='}${password}`;
      const clientId = `${'&client_id='}${settings.api.clientId}`;

      const bodyContent = `${grantContent}${userNameContent}${passwordContent}${clientId}`;
      const apiResponse: ActionResult = new ActionResult();
      apiResponse.action = 'login';
    
      const result: any = await Api.plainRequest(settings.api.loginUrl, 'POST', bodyContent, 'application/x-www-form-urlencoded', true);
      if (result.error) {
          apiResponse.error = new Error(result.error_description);
          this.clearToken();
      } else {
        this.setToken(result.access_token);
        this.setUser({username: result.username}, {title: result.role, bitMask: parseInt(result.bitMask, 0)});
        apiResponse.redirect = settings.defaultRoute;
        apiResponse.data = this.user;
        apiResponse.message = 'User has been successfully authenticated';
      }
      return apiResponse;
  }

  static async resetPassword(email: string): Promise<ActionResult> {
      let self = this;
      const apiResponse: ActionResult = new ActionResult();

      const result = await Api.patch(settings.api.resetPasswordUrl, { email }, null, true);
      if (!result.error) {
          apiResponse.redirect = settings.loginRedirect;
          apiResponse.message = 'User has been successfully authenticated';
      } else {
          apiResponse.error = new Error(result.error_description);
      }
      return apiResponse;
  }  

  static get token(): string {
      return LocalStorage.get(this.tokenKey);
  }
  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isAuthenticated() {
    return !!this.token;
  }

  private static get userKey() {
    return `${settings.tokenPrefix}_user`;
  }

  private static get tokenKey() {
    return `${settings.tokenPrefix}_${settings.tokenName}`;
  }

  static get user() {
    let usr = JSON.parse(LocalStorage.get(this.userKey));
    return usr;
  }

  private static setUser(user: any, level: any): void {
    user.accessLevel = level;
    LocalStorage.set(this.userKey, JSON.stringify(user));
  }

  private static setToken(token) {
    return LocalStorage.set(this.tokenKey, token);
  }
  /**
   * Get a token value.
   *
   * @returns {string}
   */

  private static get publicUser() {
    return { username: '', role: userRoles.public};
  }

  static isAuthorized(accessLevel, role) {
    role = (role || this.user.accessLevel) || this.publicUser.role;
    return accessLevel.bitMask <= role.bitMask;
  }

  static get accessLevel() {
    return this.user.accessLevel || accessLevels.public;
  }

  static checkAuth(nextState, replace, accessLevel) {

      const isAuth = this.isAuthenticated();

      if ( (accessLevel > 0 && !isAuth) || (accessLevel === 0 && isAuth) ) {
        replace({
          pathname : '/',
          state : { nextPathname : nextState.location.pathname },
        });
      }

      if (isAuth && nextState.location.pathname === '/') {
        replace({
          pathname : settings.defaultRoute,
          state : { nextPathname : nextState.location.pathname },
        });
      }

  }

  static logout(): Promise<ActionResult> {
      return new Promise((resolve, reject) => {
          this.clearToken();
          const apiResponse = new ActionResult();
          apiResponse.action = 'logout';
          apiResponse.message = 'User successfully logged out';
          apiResponse.redirect = settings.loginRedirect;
          resolve(apiResponse);
      });
  }

  private static clearToken(): void {
      LocalStorage.remove(this.tokenKey);
      LocalStorage.remove(this.userKey);
  }

}

export default UserAuth;
