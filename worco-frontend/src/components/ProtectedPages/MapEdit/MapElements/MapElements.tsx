import React, {useEffect, useRef, useState} from 'react';
import "./MapElements.css"
import {IElement} from "../../../../models/models";
import InteractiveMapEditService from "../../../../services/InteractiveMapEditService";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import Button from "../../../UI/Button/Button";

interface IMapElements{
    addNewElemStart: (e: DraggableEvent, data: DraggableData, dataElem:IElement) => void,
    addNewElemDrag: (e: DraggableEvent, data: DraggableData) => void,
    addNewElemStop: (e: DraggableEvent, data: DraggableData) => void,
    openAddElement: () => void,
    openEditElement: () => void,
}

const MapElements = ({addNewElemStart, addNewElemStop, addNewElemDrag, openAddElement, openEditElement}:IMapElements) => {

    const [isOpen, setIsOpen] = useState(false);

    const [elements, setElements] = useState<IElement[]>()

    const ref = useRef(null)

    useEffect(() => {
        InteractiveMapEditService.getPlacesElements()
            .then((r) => {
                setElements(r.data)
            })
    }, [])

    const [newElem, setNewElem] = useState<JSX.Element>(<div></div>)
    const refNewElem = useRef<HTMLDivElement | null>(null)

    return (
        <>
            <div className={"mapElements-button"} onClick={() => setIsOpen(!isOpen)}>Элементы</div>
            <div className={"mapElements-content"} ref={ref} data-show={isOpen}>
                <div className={"mapElements-items"}>
                {elements?.map((e, index) => {
                    return (
                        <div className={"mapElements-item"} key={index}>
                            <div>{e.type}</div>
                                <Draggable
                                    bounds={{top: 0, left: 0, right: 0, bottom: 0}}
                                    onStart={(ev, data) => addNewElemStart(ev, data, e)}
                                    onDrag={(e, data) => addNewElemDrag(e, data)}
                                    onStop={(e, data) => addNewElemStop(e, data)}
                                >
                                    <div className={"mapElements-item-image"} >
                                        <svg viewBox={`0 0 ${e.width} ${e.height}`}>
                                            <image href={e.image} x={0} y={0} width={e.width}/>
                                            <circle className={"circle"} cx={e.width/2} cy={e.height/2} r="10" fill={"black"} stroke="#000000" strokeWidth="2"/>
                                        </svg>
                                    </div>
                                </Draggable>
                            <div className={"mapElements-item-buttons"}>
                                <button><div></div></button>
                                <button><div></div></button>
                            </div>
                        </div>
                    )
                })}
                </div>
                <div className={"mapElements-add-container"}>
                    <Button onClick={openAddElement} size={"medium"} type={"black"}>Добавить элемент</Button>
                </div>
            </div>
        </>
    );
};

export default MapElements;