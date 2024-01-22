import $api from "../api/axios";
import {AxiosResponse} from "axios";
const {ApiRoutes: { InteractiveMapEdit }} = require("../Routes/apiRoutes");

export default class InteractiveMapEditService{

    static async savePositionPlaces(data:object):Promise<AxiosResponse>{
        return $api.post(InteractiveMapEdit.SavePositionPlaces, data)
    }

    static async getPlacesElements():Promise<AxiosResponse>{
        return $api.get(InteractiveMapEdit.GetPlacesElements)
    }

}