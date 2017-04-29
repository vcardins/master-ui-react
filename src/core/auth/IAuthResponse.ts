interface IAuthResponse {
    'access_token': string;
    'token_type': string;
    'expires_in': string;
    'as:client_id': string;
    'username': string;
    'role': string;
    'bitMask': string;
    '.issued': string;
    '.expires': string;
}

export default IAuthResponse;
