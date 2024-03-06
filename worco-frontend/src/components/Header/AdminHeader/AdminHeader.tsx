import React, {useContext} from 'react';
import Burger from "../Burger/Burger";
import {Link} from "react-router-dom";
import {Context} from "../../../index";

const AdminHeader = () => {
    const {store} = useContext(Context)

    return (
        <div className={"headerAdmin"}>

            <Burger/>

            <Link to={"/"} className={"headerUser-logo"}>
                <img src={"Pictures/LogoCoworking.svg"} />
            </Link>
            <div className={"headerUser-notify"}>
                <img src={"Pictures/alarm.svg"}/>
            </div>
        </div>
    );
};

export default AdminHeader;