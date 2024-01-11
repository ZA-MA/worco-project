import React, {useContext} from 'react';
import {Context} from "../../../index";
import "./UserHome.css"
import Map from "../../Map/Map";

const UserHome = () => {


    return (
        <div className={"userHome"}>
            <Map/>
        </div>
    );
};

export default UserHome;