export const ApiRoutes = {
    Authenticate: {
        LOGIN: "/Authenticate/login",
        LOGOUT: "/Authenticate/logout",
        REGISTER: "/Authenticate/register",
        CHECK_AUTH: "/Authenticate/CheckAuth",
        REFRESH_TOKEN: "/Authenticate/refresh-token",
        USER_INFO: "/Authenticate/userInfo",
        //FAVORITES: "/favorites",
    },

    InteractiveMap:{
        GET_MAPS: "/InteractiveMap/GetMaps",
        GET_MAP: "/InteractiveMap/GetInteractiveMap"
    },

    InteractiveMapEdit:{
        SavePositionPlaces: "/InteractiveMapEdit/SavePositionPlaces",
        GetPlacesElements: "/InteractiveMapEdit/GetPlacesElements",
        AddUpdateElement: "/InteractiveMapEdit/AddUpdateElement",
        DeleteElement: "/InteractiveMapEdit/DeleteElement",

    }

}