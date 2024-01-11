import React, {useContext} from 'react';
import "./LoggedIn.css"
import {useNavigate} from "react-router-dom";
import {Context} from "../../../index";
const LoggedIn = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate();

    const logout = () => {
        store.logout()
    }

    return (
        <div className={"loggedIn"}>
            <div className={"loggedIn-header"}>
                Вы уже авторизованы
            </div>
            <div className={"loggedIn-content"}>
                <button onClick={() => navigate(-1)}>
                    Вернуться назад
                </button>
                <button onClick={() => navigate("/")}>
                    Перейти на главную страницу
                </button>
                <button onClick={logout}>
                    Выйти из системы
                </button>
            </div>
        </div>
    );
};

export default LoggedIn;