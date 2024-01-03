import React, {useContext} from 'react';
import {Context} from "../../index";
import UserHome from "./UserHome/UserHome";
import GuestHome from "./GuestHome/GuestHome";

const Home = () => {
    const {store} = useContext(Context)
    return (
        <div>
            {(store.role === 'Guest' || !store.isAuth) &&  <GuestHome/>}
            {(store.role === 'User' && (store.isAuth)) && <UserHome/>}
        </div>
    );
};

export default Home;