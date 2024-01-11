import React, {useState} from 'react';
import "./CustomNavigateHeader.css"

interface ICustomNavigateHeader{
    Text?: string;
}

const CustomNavigateHeader = ({Text}: ICustomNavigateHeader) => {
    const [src, setSrc] = useState("Pictures/whiteArrow.svg")
    return (
        <div className={"navigate-header"}>
            <img src={src} onMouseEnter={() => setSrc("Pictures/blackArrow.svg")} onMouseLeave={() => setSrc("Pictures/whiteArrow.svg")}/>
            {Text?
                <div className={"navigate-header-text"}>{Text}</div> :
                <img src={"Pictures/logo.svg"}/>
            }
        </div>
    );
};

export default CustomNavigateHeader;