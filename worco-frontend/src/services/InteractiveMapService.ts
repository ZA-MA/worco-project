import $api from "../api/axios";
import {AxiosResponse} from "axios";
const {ApiRoutes: { InteractiveMap }} = require("../Routes/apiRoutes");

export default class InteractiveMapService{

    static async getMaps():Promise<AxiosResponse>{
        return $api.get(InteractiveMap.GET_MAPS)
    }

    static async getMap(data:object):Promise<AxiosResponse>{
        return $api.post(InteractiveMap.GET_MAP, data)
    }

}