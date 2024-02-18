import $api from "../api/axios";
import {AxiosResponse} from "axios";
import {IElement, INewElement} from "../models/models";
const {ApiRoutes: { InteractiveMapEdit }} = require("../Routes/apiRoutes");

export default class InteractiveMapEditService{

    static async savePositionPlaces(data:object):Promise<AxiosResponse>{
        return $api.post(InteractiveMapEdit.SavePositionPlaces, data)
    }

    static async getPlacesElements():Promise<AxiosResponse>{
        return $api.get(InteractiveMapEdit.GetPlacesElements)
    }

    static async addUpdateElement(element: IElement | INewElement):Promise<AxiosResponse>{
        return $api.post(InteractiveMapEdit.AddUpdateElement, {...element})
    }

    static async deleteElement(id:number):Promise<AxiosResponse>{
        return $api.post(InteractiveMapEdit.DeleteElement, {"id": id})
    }

}