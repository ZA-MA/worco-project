import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import './Layout.css'
import UserLayout from "./UserLayout/UserLayout";
import CompanyLayout from "./CompanyLayout/CompanyLayout";
import AdminLayout from "./AdminLayout/AdminLayout";
import GuestLayout from "./GuestLayout/GuestLayout";
import Header from "../Header/Header";

function Layout(){
    const {store} = useContext(Context)

    async function refresh() {
        await store.checkAuth()
    }

    useEffect(()=> {
        refresh()
    },[])

    return(
        <>
            {((store.role === 'User' || store.role === 'Company' || store.role === 'Admin') && (store.isAuth)) && <Header/>}
            {(store.role === 'Guest' || !store.isAuth) &&  <GuestLayout/>}
            {(store.role === 'User' && (store.isAuth)) && <UserLayout/>}
            {(store.role === 'Company' && (store.isAuth)) && <CompanyLayout/>}
            {(store.role === 'Admin' && (store.isAuth)) && <AdminLayout/>}
        </>
    )
}export default observer (Layout)
