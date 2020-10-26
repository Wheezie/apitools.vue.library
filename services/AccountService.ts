import { AxiosResponse } from 'axios';
import { AuthenticationStatus } from '../enums/AuthenticationStatus';

import IRegistrationObject from '../models/account/IRegistrationObject';
import ApiService from './ApiService';

export default class AccountService {
    static register(request: IRegistrationObject, inviteToken?: String) {
    }
}