import { useLocation, Navigate, Outlet } from "react-router-dom";
import React, {useContext} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import './../../index.css';
import {SpaRoutes} from "../../Routes/spaRoutes";
import {Loader} from "../CustomUI/Loader/Loader";

const RequireAuth = ({ allowedRole }:any) => {
    const {store} = useContext(Context)
    const location = useLocation();

    return (

        store.isAuthLoading? <Loader load={true} />
            : store?.role === allowedRole ? <Outlet />
                : store?.isAuth ? <Navigate to={SpaRoutes.UNAUTHORIZED} state={{ from: location }} replace />
                    : <Navigate to={SpaRoutes.LOGIN} state={{from: location}} replace/>
    );
}

export default  observer(RequireAuth);
