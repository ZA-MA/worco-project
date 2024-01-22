import React from 'react';
import "./Unauthorized.css"
import {useNavigate} from "react-router-dom";
import Button from "../../UI/Button/Button";

const Unauthorized = () => {
    const navigate = useNavigate()
    return (
        <div className={"unauthorized"}>
            <div className={"loggedIn-header"}>
                У вас нет доступа к этой странице
            </div>
            <div className={"loggedIn-content"}>
                <Button type={"black"} onClick={() => navigate(-1)}>
                    Вернуться назад
                </Button>
                <Button type={"black"} onClick={() => navigate("/")}>
                    Перейти на главную страницу
                </Button>
            </div>
        </div>
    );
};

export default Unauthorized;