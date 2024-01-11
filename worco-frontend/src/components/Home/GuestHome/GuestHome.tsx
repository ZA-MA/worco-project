import React, {useContext} from 'react';
import $api from "../../../api/axios";
import {Context} from "../../../index";
import "./GuestHome.css";
import Header from "../../Header/Header";

const GuestHome = () => {
    const {store} = useContext(Context)
    let data = {
        "email": "max@gmail.com",
        "password": "123.Ru",
        "rememberMe": true
    }

    const a = async () => {
        // await store.login("max@gmail.com", "123.Ru")
    }

    const b = async () => {
        await $api.get("/Home/GetL").then(r => console.log(r))
    }

    return (
        <div className={"guestHome-content"}>
            <Header/>
            <div className={"guestHome-topBlock"}>
                <img src={"Pictures/topBlockImage.png"}/>
            </div>
        </div>
    );
};

export default GuestHome;