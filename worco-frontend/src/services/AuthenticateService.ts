import {AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import $api from "../api/axios";
import {IUserInfo} from "../models/response/UserInfoResponse";
const {ApiRoutes: { Authenticate }} = require("../Routes/apiRoutes");


export default class AuthenticateService {
    //Login function
    static async login(data:object):Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>(Authenticate.LOGIN, data)
    }
    //Registration

    static async registerUser(userinfo: any):Promise<AxiosResponse>{
        return $api.post( Authenticate.REGISTER_USER, userinfo)
    }
    static async registerCompany(companyinfo: any):Promise<AxiosResponse>{
        return $api.post( Authenticate.REGISTER_COMPANY, companyinfo)
    }

    //Logout
    static async logout():Promise<void>{
        return $api.post(Authenticate.LOGOUT)
    }

    static async refreshToken(_withCredentials: boolean):Promise<AxiosResponse<AuthResponse>>{
        return await $api.get<AuthResponse>(Authenticate.REFRESH_TOKEN,
            {withCredentials:_withCredentials})
    }

    static async userInfo():Promise<AxiosResponse<IUserInfo>>{
        return await $api.get(Authenticate.USER_INFO);
    }

    static async l(){
        return await $api.get("/Home/GetL");
    }

    static async checkAuth():Promise<AxiosResponse<AuthResponse>>{
        return await $api.get<AuthResponse>(Authenticate.CHECK_AUTH,
            {withCredentials:true})
    }

}
