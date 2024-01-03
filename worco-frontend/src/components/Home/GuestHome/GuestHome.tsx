import React, {useContext} from 'react';
import $api from "../../../api/axios";
import {Context} from "../../../index";

const GuestHome = () => {
    const {store} = useContext(Context)
    let data = {
        "email": "max@gmail.com",
        "password": "123.Ru",
        "rememberMe": true
    }
    // fetch("https://localhost:5001/Authenticate/login",
    //     {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         credentials: "include",
    //         body: JSON.stringify({
    //             "email": "max@gmail.com",
    //             "password": "123.Ru",
    //             "rememberMe": true
    //         })
    //
    //     })

    const a = async () => {
        await store.login("max@gmail.com", "123.Ru")
    }

    const b = async () => {
        await $api.get("/Home/GetL").then(r => console.log(r))
    }

    return (
        <div>
            guestHome
            <button onClick={a}>Login</button>
            <button onClick={b}>2asd</button>
        </div>
    );
};

export default GuestHome;