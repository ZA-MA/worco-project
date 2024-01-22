import React, {useContext} from 'react';
import Burger from "../Burger/Burger";
import {Link} from "react-router-dom";
import {Context} from "../../../index";

const AdminHeader = () => {
    const {store} = useContext(Context)

    return (
        <div className={"headerAdmin"}>
            <div className={"headerUser-info"}>
                <Burger/>
                <img className={"headerUser-info-image"}/>
                <div className={"headerUser-info-names"}>
                    <div>{store.user.lastName} {store.user.firstName}</div>
                    <div>{store.user.email}</div>
                </div>
            </div>
            <Link to={"/"} className={"headerUser-logo"}>
                <img src={"Pictures/logo.svg"} />
            </Link>
            <div className={"headerUser-notify"}>
                <img src={"Pictures/alarm.svg"}/>
            </div>
        </div>
    );
};

export default AdminHeader;