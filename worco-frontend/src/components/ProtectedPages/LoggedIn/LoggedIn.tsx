import React, {useContext} from 'react';
import "./LoggedIn.css"
import {useNavigate} from "react-router-dom";
import {Context} from "../../../index";
import Button from "../../UI/Button/Button";
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
                <Button type={"black"} onClick={() => navigate(-1)}>
                    Вернуться назад
                </Button>
                <Button type={"black"} onClick={() => navigate("/")}>
                    Перейти на главную страницу
                </Button>
                <Button type={"white2"} onClick={logout}>
                    Выйти из системы
                </Button>
            </div>
        </div>
    );
};

export default LoggedIn;