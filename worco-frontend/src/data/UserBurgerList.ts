import {SpaRoutes} from "../Routes/spaRoutes";
import {IBurgerList} from "../models/models";

export const UserBurgerList:IBurgerList[]=
    [
        {
            name: "Главная",
            link: '/',
        },
        {
            name: "Учётные данные",
            link: SpaRoutes.USER.PROFILE,
        },
    ]