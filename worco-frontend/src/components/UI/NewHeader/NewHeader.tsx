import React, {useState} from 'react';
import "./NewHeader.css";
import {useNavigate} from "react-router-dom";

interface ICustomNavigateHeader{
    Text?: string;
    onClick?: () => void
    size?: "small" | "medium" | "large"
}

const NewHeader = ({Text, onClick, size="medium"}: ICustomNavigateHeader) => {
    const [src, setSrc] = useState("Pictures/whiteArrow.svg")
    const navigate = useNavigate()
    return (
        <div className={"header"} data-size={size}>
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                 onClick={onClick? onClick : () => navigate(-1)}
            >
                <path d="M26 13.5C26.8284 13.5 27.5 12.8284 27.5 12C27.5 11.1716 26.8284 10.5 26 10.5V13.5ZM0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.93934 10.9393ZM26 10.5H2V13.5H26V10.5Z" fill="#AA0A22" />
            </svg>
            <div className={"header-text"}>
                <div className="header-main-item1">горизонт событий</div>
                <div className="header-main-item">
                    <img src="Pictures/GrouplogoCoworking.png" alt=""/>
                </div>
                <div className="header-main-item2">коворкинг</div>
            </div>
            <div>
                <img src={"Pictures/morion 1.png"}/>
            </div>

        </div>
    );
};

export default NewHeader;