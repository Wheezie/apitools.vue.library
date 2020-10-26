import IAuthenticationRequest from './IAuthenticationRequest';

export default interface IPasswordChangeRequest extends IAuthenticationRequest {
    newPassword: string;
}