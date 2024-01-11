import React, {useContext} from 'react';
import {Context} from "../../index";
import UserHome from "./UserHome/UserHome";
import GuestHome from "./GuestHome/GuestHome";

const Home = () => {
    const {store} = useContext(Context)
    return (
        <>
            {(store.role === 'Guest' || !store.isAuth) &&  <GuestHome/>}
            {(store.role === 'User' && (store.isAuth)) && <UserHome/>}
        </>
    );
};

export default Home;