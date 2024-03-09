import React, {useContext, useEffect, useRef, useState} from 'react';
import './Burger.css';
import {Link} from "react-router-dom";
import {Context} from "../../../index";
import {SpaRoutes} from "../../../Routes/spaRoutes";
import {UserBurgerList} from "../../../data/BurgerData/UserBurgerList";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import {IBurgerList} from "../../../models/models";
import {CompanyBurgerList} from "../../../data/BurgerData/CompanyBurgerList";
import {AdminBurgerList} from "../../../data/BurgerData/AdminBurgerList";
import Button from "../../UI/Button/Button";

const Burger = () => {
    const {store} = useContext(Context)

    const firstname = store.user.firstName;
    const image = store.user.image;
    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef(null)

    const handlerBurger = () => {
        setTimeout(() => setIsOpen(!isOpen), 350)
    }

    let list: JSX.Element[] = [];

    if (store.role === "User")
        UserBurgerList.forEach((i: IBurgerList, index) => {
            list.push(
                <Link to={i.link} className={"burger-link"} key={index}>
                    <div className={"burger-link-text"}>{i.name}</div>
                </Link>
            )
        })
    else if (store.role === "Company")
        CompanyBurgerList.forEach((i: IBurgerList, index) => {
            list.push(
                <Link to={i.link} className={"burger-link"} key={index}>
                    <div className={"burger-link-text"}>{i.name}</div>
                </Link>
            )
        })
    else if (store.role === "Admin")
        AdminBurgerList.forEach((i: IBurgerList, index) => {
            list.push(
                <Link to={i.link} className={"burger-link"} key={index} onClick={handlerBurger}>
                    <div className={"burger-link-text"}>{i.name}</div>
                </Link>
            )
        })


    useOnClickOutside(ref, () => {
        if (isOpen) handlerBurger()
    });

    return (
        <>
            <div className={"burger-button"} onClick={handlerBurger}>
                <svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="8.4071" width={isOpen ? 10 : 15} height="5.18471" rx="2.59236" fill="#404040"/>
                    <rect y="16.8156" width={isOpen ? 12 : 22} height="5.18471" rx="2.59236" fill="#404040"/>
                    <rect width={isOpen ? 12 : 22} height="5.18471" rx="2.59236" fill="#404040"/>
                </svg>
            </div>

            <div className={`burger-content ${isOpen ? "burger-open" : "burger-close"}`} ref={ref}>
                <div className={"burger-content-top"}>
                    <div className={"burger-info"}>
                        <img src={"Pictures/NiceImage.png"} className={"burger-info-image"}/>

                        <div className={"burger-info-names"}>
                            {store.user.lastName} {store.user.firstName}
                        </div>
                    </div>

                    <div className={"burger-buttons-container"}>
                        <div className={"burger-links"}>
                            {list}
                        </div>
                    </div>
                </div>
                <div className={"burger-content-bottom"}>
                    <div className={"burger-number"}>
                        <div>Наш телефон:</div>
                        <div>+7-919-444-48-90</div>
                    </div>
                    <div className={"burger-exit"}>
                        <Button onClick={() => store.logout()} type={"white1"} size={"small"}>Выйти</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Burger;