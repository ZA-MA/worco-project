import $api from "../api/axios";
import {AxiosResponse} from "axios";
import {IElement, IMap, INewElement, IPlace} from "../models/models";
const {ApiRoutes: { InteractiveMapEdit }} = require("../Routes/apiRoutes");

export default class InteractiveMapEditService{

    static async getMaps():Promise<AxiosResponse>{
        return $api.get(InteractiveMapEdit.GET_MAPS)
    }

    static async getMap(data:object):Promise<AxiosResponse>{
        return $api.post(InteractiveMapEdit.GET_MAP, data)
    }

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

    static async getPlaceInfo(id:number):Promise<AxiosResponse>{
        return $api.post(InteractiveMapEdit.GetPlaceInfo, {"place_id": id})
    }

    static async addUpdatePlace(place: IPlace):Promise<AxiosResponse>{
        return $api.post(InteractiveMapEdit.AddUpdatePlace, {...place})
    }

    static async deletePlace(id: number):Promise<AxiosResponse>{
        return $api.post(InteractiveMapEdit.DeletePlace, {"place_id": id})
    }

    static async addUpdateMap(map: IMap):Promise<AxiosResponse>{
        return $api.post(InteractiveMapEdit.AddUpdateMap, map)
    }

    static async deleteMap(id: number):Promise<AxiosResponse>{
        return $api.post(InteractiveMapEdit.DeleteMap, {"map_id": id})
    }

}