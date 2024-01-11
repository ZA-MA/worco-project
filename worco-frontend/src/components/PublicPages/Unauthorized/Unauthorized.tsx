import React from 'react';
import "./Unauthorized.css"
import {useNavigate} from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate()
    return (
        <div className={"unauthorized"}>
            <div className={"loggedIn-header"}>
                У вас нет доступа к этой странице
            </div>
            <div className={"loggedIn-content"}>
                <button onClick={() => navigate(-1)}>
                    Вернуться назад
                </button>
                <button onClick={() => navigate("/")}>
                    Перейти на главную страницу
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;