import $api from "../api/axios";
import axios, {AxiosResponse} from "axios";
import header from "../components/Header/Header";

const {ApiRoutes: {InteractiveMapEdit}} = require("../Routes/apiRoutes");

export default class GlobalService {
    static async addNewImage(data: any): Promise<AxiosResponse> {
        return axios.post("https://api.imageban.ru/v1",
            data,
            {
                headers:
                    {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer jV76K7ialx7r70GWPDg1l2832iLvJK1puoJ`
                    }
            })
    }

}