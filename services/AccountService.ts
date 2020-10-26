import { AxiosResponse } from 'axios';
import { AuthenticationStatus } from '../enums/AuthenticationStatus';

import IRegistrationObject from '../models/account/IRegistrationObject';
import ApiService from './ApiService';

export default class AccountService {
    static register(request: IRegistrationObject, inviteToken?: String) {
        ApiService.authentication.subscribe(c => {
            switch(c) {
                case AuthenticationStatus.Unauthenticated:
                    ApiService.post<AxiosResponse>('account/register' + (inviteToken != null ? `/${inviteToken}`: ''), request);
                    break;
            }
        });
    }
}