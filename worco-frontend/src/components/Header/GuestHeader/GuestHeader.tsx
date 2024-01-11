import React, {useContext, useEffect} from 'react';

import {Context} from "../../../index";

import {observer} from "mobx-react-lite";
import "./GuestHeader.css"
import {Link} from "react-router-dom";

function GuestHeader() {
    const {store} = useContext(Context)

    return (
        <div className={"headerGuest"}>
            <img src={"Pictures/blackLogo.svg"}/>
            <div className={"log-buttons"}>
                <Link to={"/login"} className={"login-button"}>
                    <div>
                        Sing in
                    </div>
                </Link>
                <Link to={"/registration"} className={"registration-button"}>
                    <div>
                        Sing out
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default observer(GuestHeader)
