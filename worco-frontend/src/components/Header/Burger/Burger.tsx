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

const Burger = () => {
    const {store} = useContext(Context)

    const firstname = store.user.firstName;
    const image = store.user.image;
    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef(null)

    let list:JSX.Element[] = [];

    if(store.role === "User")
        UserBurgerList.forEach((i:IBurgerList, index) =>  {
            list.push(
                <Link to={i.link} className={"burger-link"} key={index}>
                    <img/>
                    <div className={"burger-link-text"} >{i.name}</div>
                </Link>
            )
        })
    else if(store.role === "Company")
        CompanyBurgerList.forEach((i:IBurgerList, index) =>  {
            list.push(
                <Link to={i.link} className={"burger-link"} key={index}>
                    <img/>
                    <div className={"burger-link-text"}>{i.name}</div>
                </Link>
            )
        })
    else if(store.role === "Admin")
        AdminBurgerList.forEach((i:IBurgerList, index) =>  {
            list.push(
                <Link to={i.link} className={"burger-link"} key={index}>
                    <img/>
                    <div className={"burger-link-text"}>{i.name}</div>
                </Link>
            )
        })

    const handlerBurger = () =>{
        setTimeout(() => setIsOpen(!isOpen),  450)
    }

    useOnClickOutside(ref, () => {
        if(isOpen) handlerBurger()
    });

    return (
        <>
            <div className={"burger-button"} onClick={handlerBurger} >
                <img src={""}/>
            </div>

            <div className={`burger-content ${isOpen?"burger-open" : "burger-close"}`} onClick={() => console.log(123)} ref={ref} >
                <div className={"burger-info"}>
                    <img src={"Pictures/NiceImage.png"} className={"burger-info-image"}/>

                    <div className={"burger-info-names"}>
                       {store.user.lastName} {store.user.firstName}
                    </div>
                </div>

                <div className={"burger-links"}>
                    {list}
                </div>
            </div>
        </>
    );
};

export default Burger;