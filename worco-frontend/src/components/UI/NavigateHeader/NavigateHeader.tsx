import React, {useState} from 'react';
import "./NavigateHeader.css"
import {useNavigate} from "react-router-dom";

interface ICustomNavigateHeader{
    Text?: string;
    onClick?: () => void
    size?: "small" | "medium" | "large"
}

const NavigateHeader = ({Text, onClick, size}: ICustomNavigateHeader) => {
    const [src, setSrc] = useState("Pictures/whiteArrow.svg")
    const navigate = useNavigate()
    return (
        <div className={"navigate-header"} data-size={size}>
            <button
                data-size={size}
                onClick={onClick? onClick : () => navigate(-1)}
            />
            {Text?
                <div className={"navigate-header-text"}>{Text}</div> :
                <img src={"Pictures/logo.svg"}/>
            }
        </div>
    );
};

export default NavigateHeader;