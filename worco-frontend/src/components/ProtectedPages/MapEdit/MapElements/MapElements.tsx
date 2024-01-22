import React, {useEffect, useRef, useState} from 'react';
import "./MapElements.css"
import {IPlaceElement} from "../../../../models/models";
import InteractiveMapEditService from "../../../../services/InteractiveMapEditService";
import Draggable from "react-draggable";


const MapElements = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [elements, setElements] = useState<IPlaceElement[]>()

    const ref = useRef(null)

    useEffect(() => {
        InteractiveMapEditService.getPlacesElements()
            .then((r) => {
                setElements(r.data)
            })
    }, [])

    const AddNewElem = (e: any) => {
        if (e) {
            e.target = <div>asdad</div>
            console.log(e)
        }
    }

    return (
        <>
            <div className={"mapElements-button"} onClick={() => setIsOpen(!isOpen)}>Элементы</div>
            <div className={"mapElements-content"} ref={ref} data-show={isOpen}>
                {elements?.map((e, index) => {
                    return (
                        <div className={"mapElements-item"} key={index}>
                            <div>{e.name}</div>

                                <div className={"mapElements-item-image"} >
                                    <svg viewBox={`0 0 ${e.width} ${e.height}`}>
                                        <image href={e.image} x={0} y={0} width={e.width}/>
                                        <circle className={"circle"} cx={e.width/2} cy={e.height/2} r="10" fill={"black"} stroke="#000000" strokeWidth="2"/>
                                    </svg>
                                </div>

                            <div className={"mapElements-item-buttons"}>
                                <button><div></div></button>
                                <button><div></div></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default MapElements;