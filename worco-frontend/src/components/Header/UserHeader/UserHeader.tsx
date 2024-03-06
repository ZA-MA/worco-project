import React, {useContext} from 'react';
import {Context} from "../../../index";
import "./UserHeader.css"
import Burger from "../Burger/Burger";
import {observer} from "mobx-react-lite"
import {Link} from "react-router-dom";

const UserHeader = () => {
    const {store} = useContext(Context)

    return (
        <div className={"headerUser"}>
            <div className={"headerUser-info"}>
                <Burger/>
                <img className={"headerUser-info-image"}/>
                <div className={"headerUser-info-names"}>
                    <div>{store.user.lastName} {store.user.firstName}</div>
                    <div>{store.user.email}</div>
                </div>
            </div>
            <Link to={"/"} className={"headerUser-logo"}>
                <img src={"Pictures/LogoCoworking.svg"} />
            </Link>
            <div className={"headerUser-notify"}>
                <img src={"Pictures/alarm.svg"}/>
            </div>
        </div>
    );

};


export default observer(UserHeader);