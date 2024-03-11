import React, {useEffect, useRef, useState} from 'react';
import "./MapElements.css"
import {IElement} from "../../../../models/models";
import InteractiveMapEditService from "../../../../services/InteractiveMapEditService";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import Button from "../../../UI/Button/Button";

interface IMapElements {
    addNewElemStart: (e: DraggableEvent, data: DraggableData, dataElem: IElement) => void,
    addNewElemDrag: (e: DraggableEvent, data: DraggableData) => void,
    addNewElemStop: (e: DraggableEvent, data: DraggableData) => void,
    openAddElement: () => void,
    openEditElement: (element: IElement) => void,
    elementsArray: IElement[] | undefined,
    elementsUpdate: () => void,
    newElementShow: (bool: boolean) => void
}

const MapElements = ({
                         addNewElemStart,
                         addNewElemStop,
                         addNewElemDrag,
                         openAddElement,
                         openEditElement,
                         elementsArray,
                         elementsUpdate,
                         newElementShow
                     }: IMapElements) => {

    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null)
    const [elements, setElements] = useState<IElement[]>(elementsArray ? elementsArray : [])

    const [newElem, setNewElem] = useState<JSX.Element>(<div></div>)
    const refNewElem = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (elementsArray)
            setElements(elementsArray)
    }, [elementsArray])

    const deleteElement = (id: number) => {
        if (window.confirm("Вы точно хотите удалить этот элемент?")) {
            newElementShow(false)
            InteractiveMapEditService.deleteElement(id)
                .then((r) => {
                    if (r.status === 200) {
                        alert("Элемент удален")
                        elementsUpdate()
                    }
                })
                .catch((error) => {
                    if (error.response.data.status === "Error_1")
                        alert("Такого элемента не существует")
                    else if (error.response.data.status === "Error_2")
                        alert("Этот элемент нельзя удалить, так как он уже используется")
                    else
                        alert("Что-то пошло не так, попробуйте позже")
                })
        }
    }

    return (
        <>
            {/*<div className={"mapElements-button"} onClick={() => setIsOpen(!isOpen)}>Элементы</div>*/}
            <div className={"mapElements-button"}>
                <Button onClick={() => setIsOpen(!isOpen)} size={"small"} styleProps={"white1"} selected={isOpen}>Элементы</Button>
            </div>
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
                                    <div className={"mapElements-item-image"}>
                                        <svg viewBox={`0 0 ${e.width} ${e.height}`}>
                                            <image href={e.image} x={0} y={0} width={e.width}/>
                                            <circle className={"circle"}
                                                    cx={e.indicator_x}
                                                    cy={e.indicator_y}
                                                    r={e.indicator_size}
                                                    fill={"black"} stroke="#000000" strokeWidth="0"/>
                                        </svg>
                                    </div>
                                </Draggable>
                                <div className={"mapElements-item-buttons"}>
                                    <button onClick={() => {
                                        openEditElement(e);
                                        newElementShow(false)
                                    }}>
                                        <div></div>
                                    </button>
                                    <button onClick={() => deleteElement(e.id)}>
                                        <div></div>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={"mapElements-add-container"}>
                    <Button onClick={() => {
                        openAddElement();
                        newElementShow(false)
                    }} size={"medium"} styleProps={"red"} type={"default"}>Добавить элемент</Button>
                </div>
            </div>
        </>
    );
};

export default MapElements;