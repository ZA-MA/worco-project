import React, {useContext} from 'react';
import {Context} from "../../index";
import UserHome from "./UserHome/UserHome";
import GuestHome from "./GuestHome/GuestHome";
import AdminHome from "./AdminHome/AdminHome";

const Home = () => {
    const {store} = useContext(Context)
    console.log(store)
    return (
        <>
            {(store.role === 'Guest' || !store.isAuth) &&  <GuestHome/>}
            {(store.role === 'User' && (store.isAuth)) && <UserHome/>}
            {(store.role === 'Admin' && (store.isAuth)) && <AdminHome/>}
        </>
    );
};

export default Home;