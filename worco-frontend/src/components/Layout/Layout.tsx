import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import './Layout.css'
import UserLayout from "./UserLayout/UserLayout";
import CompanyLayout from "./CompanyLayout/CompanyLayout";
import AdminLayout from "./AdminLayout/AdminLayout";
import GuestLayout from "./GuestLayout/GuestLayout";

function Layout(){
    const {store} = useContext(Context)

    async function refresh() {
        await store.checkAuth()
    }

    useEffect(()=> {
        refresh()
    },[])

    return(
        <div className={"layout-div"}>
            {(store.role === 'Guest' || !store.isAuth) &&  <GuestLayout/>}
            {(store.role === 'User' && (store.isAuth)) && <UserLayout/>}
            {(store.role === 'Company' && (store.isAuth)) && <CompanyLayout/>}
            {(store.role === 'Admin' && (store.isAuth)) && <AdminLayout/>}
        </div>
    )
}export default observer (Layout)
