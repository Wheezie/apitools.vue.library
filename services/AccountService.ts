import { AxiosResponse } from 'axios';
import { AuthenticationStatus } from '../enums/AuthenticationStatus';

import IRegistrationRequest from '../models/account/RegistrationObject';
import ApiService from './ApiService';

export default class AccountService {
    static register(request: IRegistrationRequest, inviteToken?: String) {
        ApiService.authentication.subscribe(c => {
            switch(c) {
                case AuthenticationStatus.Unauthenticated:
                    ApiService.post<AxiosResponse>('account/register' + (inviteToken != null ? `/${inviteToken}`: ''), request);
                    break;
            }
        });
    }
}