import React, {useState} from 'react';
import Draggable from "react-draggable";
import Input from "../../UI/Input/Input";

const AdminHome = () => {
    const [width, setWidth] = useState()
    return (
        <div className={"adminHome"}>
            <Input type={"number"} onChange={(event) => setWidth(event.target.value)}/>
            <svg style={{width: "300px", height: "300px", backgroundColor: "red"}} viewBox={`-${width} -${width} ${width} ${width}`}>
                <Draggable>
                    <circle style={{width: "20px", height: "20px", backgroundColor: "black"}} r={10}>

                    </circle>
                </Draggable>
            </svg>
        </div>
    );
};

export default AdminHome;