interface IApiSettings {
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

export default IApiSettings;
