export const ApiRoutes = {
    Authenticate: {
        LOGIN: "/Authenticate/login",
        LOGOUT: "/Authenticate/logout",
        REGISTER_USER: "/Authenticate/registerUser",
        REGISTER_COMPANY: "/Authenticate/registerCompany",
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
        GET_MAPS: "/InteractiveMapEdit/GetMaps",
        GET_MAP: "/InteractiveMapEdit/GetInteractiveMap",

        SavePositionPlaces: "/InteractiveMapEdit/SavePositionPlaces",
        GetPlacesElements: "/InteractiveMapEdit/GetPlacesElements",
        AddUpdateElement: "/InteractiveMapEdit/AddUpdateElement",
        DeleteElement: "/InteractiveMapEdit/DeleteElement",

        GetPlaceInfo: "/InteractiveMapEdit/GetPlaceInfo",
        AddUpdatePlace: "/InteractiveMapEdit/AddUpdatePlace",
        DeletePlace: "/InteractiveMapEdit/DeletePlace",

        AddUpdateMap: "/InteractiveMapEdit/AddUpdateMap",
        DeleteMap: "/InteractiveMapEdit/DeleteMap",

    }

}