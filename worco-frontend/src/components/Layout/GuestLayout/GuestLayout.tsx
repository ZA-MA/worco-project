import React, {useContext, useEffect} from 'react';

import {Context} from "../../../index";

import {observer} from "mobx-react-lite";
import ContextProviderContainer from "../../../ContextProviderContainer";
import "./GuestLayout.css"
import App from "../../../App";
import {Route, Routes} from "react-router-dom";
import {SpaRoutes} from "../../../Routes/spaRoutes";
import Main from "../../PublicPages/Main/Main";

function GuestLayout(){
    const {store} = useContext(Context)

    /*async function refresh() {
        await store.checkAuth()
    }

    useEffect(()=> {
        refresh()
        store.setAuthLoading(false)
    },[])*/

    return(
        <div className={"guest-layout"}>
            <div className={"guest-content"}>
                <Context.Provider value={{store}}>
                    <ContextProviderContainer/>
                </Context.Provider>
            </div>
        </div>
    )
}export default observer (GuestLayout)
