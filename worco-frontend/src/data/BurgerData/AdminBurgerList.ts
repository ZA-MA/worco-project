import {SpaRoutes} from "../../Routes/spaRoutes";
import {IBurgerList} from "../../models/models";


export const AdminBurgerList:IBurgerList[]=
    [
        {
            name: "Главная",
            link: '/',
        },
        {
            name: "Редактировать карту",
            link: SpaRoutes.ADMIN.INTERACTIVE_MAP_EDIT,
        },
    ]