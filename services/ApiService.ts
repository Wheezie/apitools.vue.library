
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { reactive, UnwrapRef } from 'vue';

import { AuthenticationStatus } from '../enums/AuthenticationStatus';
import ITokenResponse from '../models/authentication/ITokenResponse';
import IAuthenticationRequest from '../models/authentication/IAuthenticationRequest';
import IAuthenticationInfo from '../models/authentication/IAuthenticationInfo';

const STORAGE_API_TOKEN = "apitools_token";

class ApiService {
    private _http = axios.create({
        baseURL: process.env.VUE_APP_API_BASEURL,
        headers: {
            "content-type": "application/json"
        }
    });
    private _info: UnwrapRef<IAuthenticationInfo>;

    constructor() {
        this._info = reactive({ status: AuthenticationStatus.NotChecked });
    }

    /* Information */
    get info(): IAuthenticationInfo {
        return this._info;
    }

    get authenticated() {
        return (this.info.status == AuthenticationStatus.Authenticated);
    }

    login(username: string, password: string) {
        const authRequest: IAuthenticationRequest = {
            username: username,
            password: password
        };

        this.post<ITokenResponse>('auth/login', authRequest)
            .then(response => {
                if (response.status == 200) {
                    this.setAuthenticationToken(response.data.token);
                }
                console.log(this.info) 
            }, _ => this.clearAuthenticationToken());
    }

    logout() {
        this.post<ITokenResponse>('auth/signout', null)
            .then(_ => this.clearAuthenticationToken());
    }

    verify() {
        this.get<ITokenResponse>('auth/checkin')
            .then(response => {
                if (response.status == 200) {
                    this.setAuthenticationToken(response.data?.token);
                }
            });
    }

    /* REST functionality */
    get<T>(uri: string, options?: AxiosRequestConfig | undefined) {
        return this._http.get<T>(uri, options)
            .then(response => this.checkResponseErrors<T>(response));
    }
    
    post<T>(uri: string, data: any, options?: AxiosRequestConfig | undefined) {
        return this._http.post<T>(uri, data, options)
            .then(response => this.checkResponseErrors<T>(response));
    }

    put<T>(uri: string, data: any, options?: AxiosRequestConfig | undefined) {
        return this._http.put<T>(uri, data, options)
            .then(response => this.checkResponseErrors<T>(response));
    }
    
    patch<T>(uri: string, options?: AxiosRequestConfig | undefined) {
        return this._http.patch<T>(uri, options)
            .then(response => this.checkResponseErrors<T>(response));
    }
    
    delete<T>(uri: string, options?: AxiosRequestConfig | undefined) {
        return this._http.delete<T>(uri, options)
            .then(response => this.checkResponseErrors<T>(response));
    }

    /* Private */
    private checkResponseErrors<T>(response: AxiosResponse<T>) {
        switch (response.status)
        {
            case 401:
                this.clearAuthenticationToken();
                break;
        }

        return response;
    }

    private setAuthenticationToken(token: string) {
        if (token != null) {
            this._http.defaults.headers["authorization"] = token;
            localStorage.setItem(STORAGE_API_TOKEN, token);
            this._info.status = AuthenticationStatus.Authenticated;
        } else {
            const token = localStorage.getItem(STORAGE_API_TOKEN);
            if (token != null) {
                this._http.defaults.headers["authorization"] = token;
                this._info.status = AuthenticationStatus.Authenticated;
            }
        }
    }

    private clearAuthenticationToken() {
        localStorage.removeItem(STORAGE_API_TOKEN);
        delete this._http.defaults.headers["authorization"];
        this._info.status = AuthenticationStatus.Unauthenticated;
    }
};

export default new ApiService();