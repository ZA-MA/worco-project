import {IUser} from "../user/IUser";

export interface AuthResponse {
    token:string;
    refreshtoken:string;

    role:string;
    user: IUser;
    helpNumber: string;
}
