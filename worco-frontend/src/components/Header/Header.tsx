import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import './Header.css'
import GuestHeader from "./GuestHeader/GuestHeader";
import UserHeader from "./UserHeader/UserHeader";
import CompanyHeader from "./CompanyHeader/CompanyHeader";
import AdminHeader from "./AdminHeader/AdminHeader";


function Header(){
    const {store} = useContext(Context)

    return(
        <>
            {(store.role === 'Guest' || !store.isAuth) &&  <GuestHeader/>}
            {(store.role === 'User' && (store.isAuth)) && <UserHeader/>}
            {(store.role === 'Company' && (store.isAuth)) && <CompanyHeader/>}
            {(store.role === 'Admin' && (store.isAuth)) && <AdminHeader/>}
        </>
    )
}export default observer (Header)
