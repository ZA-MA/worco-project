import React, {useContext, useEffect, useRef, useState} from 'react';
import './UserBurger.css';
import {Link} from "react-router-dom";
import {Context} from "../../../../index";
import {SpaRoutes} from "../../../../Routes/spaRoutes";
import {UserBurgerList} from "../../../../data/UserBurgerList";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

const UserBurger = () => {
    const {store} = useContext(Context)

    const firstname = store.user.firstName;
    const image = store.user.image;
    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef(null)

    let list = [<></>];

    UserBurgerList.forEach((i) =>  {
        list.push(
            <Link to={i.link} className={"burgerUser-link"} key={i.name}>
                <img/>
                <div className={"burgerUser-link-text"}>{i.name}</div>
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
        <div className='burgerUser' ref={ref}>
            <div className={"burgerUser-button"} onClick={handlerBurger} >
                <img src={""}/>
            </div>

            <div className={`burgerUser-content ${isOpen?"burger-open" : "burger-close"}`} onClick={() => console.log(123)}  >
                <div className={"burgerUser-info"}>
                    <img src={"Pictures/NiceImage.png"} className={"burgerUser-info-image"}/>

                    <div className={"burgerUser-info-names"}>
                       {store.user.lastName} {store.user.firstName}
                    </div>
                </div>

                <div className={"burgerUser-links"}>
                    {list}
                </div>
            </div>
        </div>
    );
};

export default UserBurger;