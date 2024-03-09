import React, {useContext} from 'react';
import "./LoggedIn.css"
import {useNavigate} from "react-router-dom";
import {Context} from "../../../index";
import Button from "../../UI/Button/Button";
const LoggedIn = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate();

    return (
        <div className={"loggedIn"}>
            <div className={"loggedIn-header"}>
                Вы уже авторизованы
            </div>
            <div className={"loggedIn-content"}>
                <Button type={"red"} onClick={() => navigate(-1)}>
                    Вернуться назад
                </Button>
                <Button type={"red"} onClick={() => navigate("/")}>
                    Перейти на главную страницу
                </Button>
                <Button type={"white2"} onClick={() => store.logout()}>
                    Выйти из системы
                </Button>
            </div>
        </div>
    );
};

export default LoggedIn;