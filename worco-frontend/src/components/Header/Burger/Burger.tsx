import React, {useContext, useEffect, useRef, useState} from 'react';
import './Burger.css';
import {Link, useLocation} from "react-router-dom";
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

    const location = useLocation()

    const handlerBurger = () => {
        setTimeout(() => setIsOpen(!isOpen), 350)
    }

    let list: JSX.Element[] = [];

    if (store.role === "User")
        UserBurgerList.forEach((i: IBurgerList, index) => {
            list.push(
                <Link to={i.link} className={"burger-link"} key={index} data-sel={location.pathname === i.link}>
                    {i.name}
                </Link>
            )
        })
    else if (store.role === "Company")
        CompanyBurgerList.forEach((i: IBurgerList, index) => {
            list.push(
                <Link to={i.link} className={"burger-link"} key={index} data-sel={location.pathname === i.link}>
                    {i.name}
                </Link>
            )
        })
    else if (store.role === "Admin")
        AdminBurgerList.forEach((i: IBurgerList, index) => {
            list.push(
                <Link to={i.link} className={"burger-link"} key={index} onClick={handlerBurger} data-sel={location.pathname === i.link}>
                    {i.name}
                </Link>
            )
        })


    useOnClickOutside(ref, () => {
        if (isOpen) handlerBurger()
    });

    return (
        <>
            <div className={"burger-button"} onClick={handlerBurger}>
                <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/*<rect width={isOpen ? 12 : 22} height="1" rx="2.59236" fill="#000000"/>
                    <rect y="8.4071" width={isOpen ? 10 : 15} height="1" rx="2.59236" fill="#000000"/>
                    <rect y="16.8156" width={isOpen ? 12 : 22} height="1" rx="2.59236" fill="#000000"/>*/}

                    {/*<line x1="0" y1="1" x2="60" y2="1" stroke="black" strokeWidth={2}/>
                    <line x1="0" y1="15" x2="60" y2="15" stroke="black" strokeWidth={2}/>
                    <line x1="0" y1="29" x2="60" y2="29" stroke="black" strokeWidth={2}/>*/}

                    <path d={isOpen ? "M0 1H20" : "M0 1H60"} stroke="black"/>
                    <path d={isOpen ? "M0 15H35" : "M0 15H45"} stroke="black"/>
                    <path d={isOpen ? "M0 29H50" : "M0 29H30"} stroke="black"/>

                    {/*<line x1="0" y1="1" x2={isOpen ? 50 : 60} y2="1" stroke="black" strokeWidth={2}/>
                    <line x1="0" y1="15" x2={isOpen ? 35 : 45} y2="15" stroke="black" strokeWidth={2}/>
                    <line x1="0" y1="29" x2={isOpen ? 20 : 30} y2="29" stroke="black" strokeWidth={2}/>*/}
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
                        <div className={"enable-select"}>+7-919-444-48-90</div>
                    </div>
                    <div className={"burger-exit"}>
                        <Button onClick={() => store.logout()} styleProps={"white1"} size={"small"}>Выйти</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Burger;