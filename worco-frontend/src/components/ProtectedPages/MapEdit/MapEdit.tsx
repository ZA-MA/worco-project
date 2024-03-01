import React, {useContext, useEffect, useRef, useState} from 'react';
import "./MapEdit.css"
import "../Map/Map.css"
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import DropDown, {IDropdownOption} from "../../UI/DropDown/DropDown";
import Button from "../../UI/Button/Button";
import {IElement, IHint, IInteractiveMap, IMap, IMeetingRoom, IOffice, IPlace} from "../../../models/models";
import InteractiveMapService from "../../../services/InteractiveMapService";
import {Context} from "../../../index";
import {ConfigProvider, Switch} from "antd";
import InteractiveMapEditService from "../../../services/InteractiveMapEditService";
import MapElements from "./MapElements/MapElements";
import {JSX} from "react/jsx-runtime";
import AddEditPlace from "./AddEditPlace/AddEditPlace";
import AddEditElement from "./AddEditElement/AddEditElement";
import AddEditMap from "./AddEditMap/AddEditMap";

const MapEdit = () => {
    const {store} = useContext(Context)

    const [scale, setScale] = useState(100)
    const [floor, setFloor] = useState("Первый этаж")
    const [maps, setMaps] = useState<IMap[]>([])

    const [mapSel, setMapSel] = useState<string | undefined>("Выберите карту")
    const [map, setMap] = useState<IMap>()
    const [interactiveMap, setInteractiveMap] = useState<IInteractiveMap>()
    const [places, setPlaces] = useState<IPlace[]>()
    const [meetingRooms, setMeetingRooms] = useState<IPlace[]>()
    const [offices, setOffices] = useState<IPlace[]>()

    const [canEditPosition, setCanEditPosition] = useState(false)

    const [showHint, setShowHint] = useState(false)
    const [hint, setHint] = useState<IHint>({width: 0, height: 0, y1: 0, x1: 0, y2: 0, x2: 0})

    const [posNewElem, setPosNewElem] = useState({x: 0, y: 0})
    let newElemPos = {x: 0, y: 0}
    const [newElemShow, setNewElemShow] = useState(false)
    const [newElemProps, setNewElemProps] = useState<IPlace>()
    const [newElemConfirm, setNewElemConfirm] = useState(false)
    const [canAdd, setCanAdd] = useState(false)

    const [addEditPlacePopup, setAddEditPlacePopup] = useState<JSX.Element | null>(null)

    const [elements, setElements] = useState<IElement[]>()

    const refMap = useRef<HTMLDivElement | null>(null)

    const [addEditMapPopup, setAddEditMapPopup] = useState<JSX.Element | null>(null)

    let listPlaces: JSX.Element[] = []

    // function downloadSVG() {
    //     // @ts-ignore
    //     html2canvas(document.querySelector("#MapEdit")).then(canvas => {
    //         let canvasUrl = canvas.toDataURL("image/jpeg", 0.5);
    //         console.log(canvasUrl);
    //         const createEl = document.createElement('a');
    //         createEl.href = canvasUrl;
    //         createEl.download = "download-this-canvas";
    //         createEl.click();
    //         createEl.remove();
    //     });
    // }

    const changeScale = (e: any) => {
        if (e.target.className.baseVal !== "circle") {
            var delta = e.deltaY || e.detail || e.wheelDelta;
            if (delta < 0) {
                setScale(scale + 10)
            } else if (scale > 70) {
                setScale(scale - 10)
            }
        }
    }

    const getMaps = () => {
        store.DataLoadingON()
        InteractiveMapEditService.getMaps()
            .then((r) => {

                setMaps(r.data)
                setMapSel(r.data[0].name ? r.data[0].name : "Выберите карту")

            })
            .catch()
            .finally(() => store.DataLoadingOFF())
    }

    const getMap = () => {
        store.DataLoadingON()
        InteractiveMapEditService.getMap({"Info1": mapSel})
            .then((r) => {
                setInteractiveMap(r.data)
                setPlaces(r.data.map.places)
                setMap(r.data.map)
                listPlaces = []
            })
            .catch()
            .finally(() => store.DataLoadingOFF())
    }

    useEffect(() => {
        if(mapSel !== "Выберите карту" && mapSel){
            store.DataLoadingON()
            InteractiveMapEditService.getMap({"Info1": mapSel})
                .then((r) => {
                    setInteractiveMap(r.data)
                    setPlaces(r.data.map.places)
                    setMap(r.data.map)
                    listPlaces = []
                })
                .catch()
                .finally(() => store.DataLoadingOFF())
        }
    }, [mapSel])

    const getElements = () => {
        store.DataLoadingON()
        InteractiveMapEditService.getPlacesElements()
            .then((r) => {
                setElements(r.data)
            })
            .catch()
            .finally(() => store.DataLoadingOFF())
    }

    const changeMap = (e: string) => {
        if (e !== mapSel) {
            setMapSel(e)
            setScale(100)
        }
    }

    let ArrayMaps: IDropdownOption[] = []
    maps.map((item) => {
        ArrayMaps.push({name: item.name})
    })

    const DragPlace = (e: DraggableEvent, data: DraggableData, id: number, width: number, height: number) => {
        if (places) {
            for (let i = 0; i < places.length; i++) {
                if (id !== places[i].id) {
                    if (showHint) setShowHint(false)

                    let positionElem = {
                        top: places[i].y,
                        left: places[i].x,
                        bottom: places[i].y + Number(places[i].element.height),
                        right: places[i].x + Number(places[i].element.width)
                    }
                    let positionTarget = {
                        top: data.y,
                        left: data.x,
                        bottom: data.y + Number(height),
                        right: data.x + Number(width)
                    }
                    let pCenterUD = Math.floor(((positionTarget.left + Number(width) / 2) - (positionElem.left + Number(places[i].element.width) / 2)) * 10) / 10
                    let pCenterLR = Math.floor(((positionTarget.top + Number(height) / 2) - (positionElem.top + Number(places[i].element.height) / 2)) * 10) / 10

                    if (positionTarget.bottom > positionElem.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
                        positionTarget.top < positionElem.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
                        positionTarget.right > positionElem.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
                        positionTarget.left < positionElem.right) {
                        return false
                    } else if (pCenterUD <= 0.5 && pCenterUD >= -0.5) {
                        if (positionTarget.bottom > positionElem.bottom) {
                            console.log(pCenterUD)
                            console.log("Down")
                            setShowHint(true)
                            setHint({
                                width: 1,
                                height: (positionTarget.top + Number(width) / 2) - (positionElem.top + Number(places[i].element.height) / 2),
                                x1: positionElem.left + Number(places[i].element.width) / 2,
                                y1: positionElem.top + Number(places[i].element.height) / 2,
                                x2: positionElem.left + Number(places[i].element.width) / 2,
                                y2: positionElem.top + Number(places[i].element.height) / 2 + (positionTarget.top + Number(width) / 2) - (positionElem.top + Number(places[i].element.height) / 2)
                            })

                        } else if (positionTarget.top < positionElem.top) {
                            console.log("Up")
                            setShowHint(true)
                            setHint({
                                width: 1,
                                height: (positionElem.top + Number(places[i].element.height) / 2) - (positionTarget.top + Number(width) / 2),
                                x1: positionTarget.left + Number(width) / 2,
                                y1: positionTarget.top + Number(height) / 2,
                                x2: positionTarget.left + Number(width) / 2,
                                y2: positionElem.top + Number(places[i].element.height) / 2
                            })
                        }
                    } else if (pCenterLR <= 0.5 && pCenterLR >= -0.5) {
                        if (positionTarget.right > positionElem.right) {
                            console.log("Right")
                            setShowHint(true)
                            setHint({
                                width: 1,
                                height: 1,
                                x1: (positionElem.left + Number(places[i].element.width) / 2),
                                y1: positionElem.top + Number(places[i].element.height) / 2,
                                x2: positionTarget.left + Number(width) / 2,
                                y2: positionTarget.top + Number(height) / 2
                            })
                        } else if (positionTarget.left < positionElem.left) {
                            console.log("Left")
                            setShowHint(true)
                            setHint({
                                width: 1,
                                height: 1,
                                x1: (positionTarget.left + Number(width) / 2),
                                y1: positionTarget.top + Number(height) / 2,
                                x2: positionElem.left + Number(places[i].element.width) / 2,
                                y2: positionElem.top + Number(places[i].element.height) / 2
                            })
                        }
                    }
                }
            }
        }
    }

    const onDragStop = (e: DraggableEvent, data: DraggableData, id: number) => {

        setShowHint(false)

        // @ts-ignore
        let arrPlaces = [...places]
        let pl = arrPlaces?.find((p) => p.id === id)
        if (pl) {
            pl.x = data.lastX
            pl.y = data.lastY
            setPlaces(arrPlaces)
            console.log(pl.x)
        }
    }

    const SavePositionPlace = () => {
        let data: object[] = []

        let places = document.querySelectorAll(".interactiveMap-place")
        for (let i = 0; i < places.length; i++) {
            let transform = places[i]?.attributes.getNamedItem("transform")?.nodeValue
            let values = transform?.slice(10, transform.length - 1).split(",")
            if (values) {
                data.push({
                    "id": places[i].attributes.getNamedItem("data-id")?.nodeValue,
                    "x": values[0],
                    "y": values[1]
                })
            }
        }
        //console.log(data)
        InteractiveMapEditService.savePositionPlaces({ListPlaces: data})
    }

    const addNewElemStart = (e: DraggableEvent, data: DraggableData, dataElem: IElement) => {
        setNewElemShow(true)
        let newId = 0;
        if (places && places.length > 0) {
            newId = places.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id + 1
        }
        setPosNewElem({x: 0, y: 0})
        setNewElemConfirm(false)
        setNewElemProps({
            id: newId,
            number_place: 0,
            can_bron: true,
            visible: true,
            x: 0,
            y: 0,
            opt_conditioner: false,
            opt_printer: false,
            opt_scanner: false,
            price: 0,
            map_id: map?.id ? map.id : 0,

            element_id: dataElem.id,
            element: dataElem
        })
    }


    const addNewElemDrag = (e: DraggableEvent, data: DraggableData) => {
        //console.log(e)
        if ("pageX" in e) {
            setPosNewElem({x: e.pageX, y: e.pageY - 70})
        }

        // @ts-ignore
        if (e.target.id !== "svgMap") setCanAdd(false)
        else setCanAdd(true)

    }

    const addNewElemStop = (e: DraggableEvent, data: DraggableData) => {
        setNewElemShow(false)
        if (newElemProps && canAdd) {
            // if(places)
            //     setPlaces([...places, newElemProps])

            setNewElemProps({...newElemProps, x: newElemPos.x - newElemProps.element.width / 2, y: newElemPos.y - newElemProps.element.height / 2})
            //setNewElemProps({...newElemProps, x: newElemPos.x, y: newElemPos.y})
            setNewElemConfirm(true)
            //let _places = places
            //_places?.push({...newElemProps, x: newElemPos.x - newElemProps.element.width / 2, y: newElemPos.y - newElemProps.element.height / 2})

        } else {
            setNewElemProps(undefined)
            setNewElemConfirm(false)
        }
    }

    function moveMouseOnMap(evt: any) {
        evt.preventDefault()
        if (newElemShow && newElemProps) {

            let dim = evt.target.getBoundingClientRect();
            let x = (evt.clientX - dim.left) / scale * 100;
            let y = (evt.clientY - dim.top) / scale * 100;

            newElemPos.x = x
            newElemPos.y = y

            if (places && newElemProps && canAdd) {
                for (let i = 0; i < places.length; i++) {
                    let positionElem = {
                        top: Number(places[i].y),
                        left: Number(places[i].x),
                        bottom: Number(places[i].y) + Number(places[i].element.height),
                        right: Number(places[i].x) + Number(places[i].element.width)
                    }
                    let positionTarget = {
                        top: y - newElemProps.element.height / 2,
                        left: x - newElemProps.element.width / 2,
                        bottom: y - newElemProps.element.height / 2 + Number(newElemProps.element.height),
                        right: x - newElemProps.element.width / 2 + Number(newElemProps.element.width)
                    }

                    if (positionTarget.bottom > positionElem.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
                        positionTarget.top < positionElem.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
                        positionTarget.right > positionElem.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
                        positionTarget.left < positionElem.right) {
                        setCanAdd(false)
                        // document.getElementById(`place-${id}`)?.setAttribute("transform", `translate(100, 100)`)
                    }
                }
            }
        }
    }

    const addNewPlaceHandler = () => {
        if (newElemProps)
            setAddEditPlacePopup(<AddEditPlace placeProps={newElemProps} isAdd={true}
                                               onClose={() => {
                                                   setAddEditPlacePopup(null)
                                               }}
                                               onUpdateData={() => {
                                                   getMap()
                                                   setNewElemProps(undefined)
                                                   setNewElemShow(false)
                                                   setNewElemConfirm(false)
                                               }}
            />)
    }

    const editPlaceHandler = (id: number, place: IPlace | IMeetingRoom | IOffice) => {
        setAddEditPlacePopup(null)
        store.DataLoadingON()
        InteractiveMapEditService.getPlaceInfo(id)
            .then((r) => {
                console.log(r)
                store.DataLoadingOFF()
                setAddEditPlacePopup(
                    <AddEditPlace placeProps={place} isAdd={false} is_now_bron={r.data.is_now_bron}
                                  is_any_bron={r.data.is_any_bron}
                                  onClose={() => {
                                      setAddEditPlacePopup(null)
                                  }}
                                  onUpdateData={() => getMap()}
                    />)
            })
            .catch((e) => console.log("Что-то пошло не так"))
    }

    const [addEditElementPopup, setAddEditElementPopup] = useState<JSX.Element | null>(null)

    const AddNewElement = () => {
        setAddEditElementPopup(<AddEditElement onClose={() => setAddEditElementPopup(null)} onAddEditEnd={() => {
            getMap();
            getElements()
        }} isAdd={true}/>)
    }

    const EditElement = (element: IElement) => {
        setAddEditElementPopup(<AddEditElement onClose={() => setAddEditElementPopup(null)} onAddEditEnd={() => {
            getMap();
            getElements()
        }} elementProps={element} isAdd={false}/>)
    }

    useEffect(() => {
        getMaps()
    }, [])

    useEffect(() => {
        if (mapSel && mapSel !== "Выберите карту") {
            getElements()
        }
    }, [mapSel])

    //console.log(window.innerWidth / window.innerHeight) 100-
    return (
        <div className={"interactiveMap"}>
            <div className={"interactiveMap-panel"}>
                <div className={"interactiveMapEdit-panel-editPosition"}>
                    <ConfigProvider
                        theme={{
                            token: {

                                fontFamily: "Montserrat",
                                colorPrimary: '#404040',
                                colorPrimaryActive: "#404040",
                                borderRadius: 10,
                                colorBgContainer: '#EFEFEF',
                            },
                        }}
                    >
                        <Switch onChange={(e) => setCanEditPosition(e)}/>
                    </ConfigProvider>
                    <div>Редактировать расположение</div>
                    <Button onClick={() => SavePositionPlace()} size={"small"} type={"black"}>Сохранить</Button>
                </div>
                <div className={"interactiveMapEdit-panel-floor"}>
                    <DropDown
                        value={mapSel}
                        options={ArrayMaps}
                        onChange={(e) => changeMap(e)}
                        placeHolder={"Выберите этаж"}
                        size={"small"}/>
                    <div className={"interactiveMapEdit-panel-floor-btn"}>
                        <button onClick={() => {
                            setAddEditMapPopup(<AddEditMap isAdd={false}
                                                           onClose={() => setAddEditMapPopup(null)}
                                                           mapProps={map}
                                                           onDataUpdate={() => {
                                                               getMaps()
                                                           }}
                                />
                            )
                        }}>
                            <div></div>
                        </button>
                        <button onClick={() => {
                            setAddEditMapPopup(<AddEditMap isAdd={true}
                                                           onClose={() => setAddEditMapPopup(null)}
                                                           onDataUpdate={() => {
                                                               getMaps()
                                                           }}
                                />
                            )
                        }}>
                            <div></div>
                        </button>
                    </div>
                </div>
                {elements &&
                    <MapElements addNewElemStart={addNewElemStart} addNewElemDrag={addNewElemDrag}
                                 addNewElemStop={addNewElemStop} openAddElement={AddNewElement}
                                 openEditElement={(elem) => EditElement(elem)}
                                 elementsArray={elements}
                                 elementsUpdate={getElements}
                                 newElementShow={(bool: boolean) => !bool && setNewElemProps(undefined)}
                    />
                }

            </div>
            {/*1509 903*/}
            {interactiveMap?.map &&

                <Draggable cancel={"g, .mapEdit-newElem"} axis={"both"} scale={scale / 100} bounds={{
                    top: -interactiveMap?.map.height / 2,
                    left: -interactiveMap?.map.width / 2,
                    right: interactiveMap?.map.width / 2,
                    bottom: interactiveMap?.map.height / 2
                }}>
                    <div className={"interactiveMap-content"} style={{
                        scale: `${scale}%`,
                        width: `${interactiveMap?.map.width}px`,
                        height: `${interactiveMap?.map.height}px`
                    }} ref={refMap}
                         onWheel={(e) => changeScale(e)}

                    >
                        <img src={interactiveMap?.map.image}/>

                        <svg id={"svgMap"} viewBox={`0 0 ${interactiveMap?.map.width} ${interactiveMap?.map.height}`}
                             onMouseMove={(e) => moveMouseOnMap(e)}>
                            {places?.map((p, index) => {
                                return(
                                    <Draggable
                                        bounds={
                                            {
                                                top: 0, left: 0,
                                                right: interactiveMap?.map.width? interactiveMap?.map.width - p.element.width : interactiveMap?.map.width,
                                                bottom: interactiveMap?.map.height? interactiveMap?.map.height - p.element.height :  interactiveMap?.map.height
                                            }}
                                        axis={"both"}
                                        defaultPosition={{x: p.x, y: p.y}}
                                        scale={scale / 100}
                                        key={p.id}
                                        disabled={!canEditPosition}
                                        grid={[1, 1]}
                                        onDrag={(e, data) => DragPlace(e, data, p.id, p.element.width, p.element.height)}
                                        onStop={(e, data) => onDragStop(e, data, p.id)}
                                    >
                                        <g className={"interactiveMap-place"} key={p.id} id={`place-${p.id}`} data-id={p.id}
                                           data-width={p.element.width} data-height={p.element.height}
                                           onClick={() => canEditPosition ? undefined : editPlaceHandler(p.id, p)}
                                           style={{cursor: canEditPosition ? "grab" : "pointer"}}
                                        >
                                            {!p.element.only_indicator &&
                                                <image href={p.element.image} width={p.element.width} x={0} y={0}/>}
                                            <circle className={"circle"}
                                                    cx={p.element.indicator_x}
                                                    cy={p.element.indicator_y}
                                                    r={p.element.indicator_size}
                                                    fill={"black"} stroke="#000000" strokeWidth="0"/>
                                        </g>
                                    </Draggable>
                                )
                            })}
                            {newElemConfirm && newElemProps &&
                                <Draggable
                                    cancel={"foreignObject"}
                                    bounds={{
                                        top: 0,
                                        left: 0,
                                        right: interactiveMap?.map.width - newElemProps.element.width,
                                        bottom: interactiveMap?.map.height - newElemProps.element.height
                                    }}
                                    axis={"both"}
                                    scale={scale / 100}
                                    defaultPosition={{
                                        x: Math.floor(newElemProps.x),
                                        y: Math.floor(newElemProps.y)
                                    }}
                                    key={newElemProps.id}
                                    grid={[2, 2]}
                                    onDrag={(e, data) => DragPlace(e, data, newElemProps.id, newElemProps.element.width, newElemProps.element.height)}
                                    onStop={(e, data) => {
                                        setNewElemProps({...newElemProps, x: data.x, y: data.y})
                                        //onDragStop(e, data, newElemProps.id)
                                        setShowHint(false)
                                    }}
                                >
                                    <g className={"interactiveMap-place"} key={newElemProps.id}
                                       id={`place-${newElemProps.id}`}
                                       data-id={newElemProps.id} data-width={newElemProps.element.width}
                                       data-height={newElemProps.element.height}>
                                        {!newElemProps.element.only_indicator &&
                                            <image href={newElemProps.element.image} width={newElemProps.element.width}
                                                   x={0} y={0}/>}
                                        <circle className={"circle"}
                                                cx={newElemProps.element.indicator_x}
                                                cy={newElemProps.element.indicator_y}
                                                r={newElemProps.element.indicator_size}
                                                fill={"black"} stroke="#000000" strokeWidth="0"/>
                                        <foreignObject className={"mapEdit-newElem-confirm"} width="70" height="55"
                                                       x={newElemProps.element.width / 2 - 35}
                                                       y={newElemProps.element.height + 10}>
                                            <div className="mapEdit-newElem-confirm-arrow"></div>
                                            <div className={"mapEdit-newElem-confirm-content"}>
                                                <button onClick={addNewPlaceHandler}>
                                                    <div/>
                                                </button>
                                                <button onClick={() => {
                                                    setNewElemConfirm(false)
                                                    setNewElemProps(undefined)
                                                    setAddEditPlacePopup(null)
                                                }}>
                                                    <div/>
                                                </button>
                                            </div>
                                        </foreignObject>
                                    </g>
                                </Draggable>
                            }
                            <line className={"interactiveMap-hintPos"} style={{display: showHint ? "block" : "none"}}
                                  x1={hint.x1} y1={hint.y1} x2={hint.x2} y2={hint.y2} strokeWidth={hint.width}
                                  stroke={"red"}></line>
                        </svg>
                    </div>
                </Draggable>
            }
            {newElemShow && newElemProps &&
                <div className={"mapEdit-newElem"} style={{
                    width: newElemProps.element.width * scale / 100,
                    height: newElemProps.element.height * scale / 100,
                    top: `${posNewElem.y - newElemProps.element.height * scale / 100 / 2}px`,
                    left: `${posNewElem.x - newElemProps.element.width * scale / 100 / 2}px`
                }} data-canAdd={canAdd}>
                    <svg
                        viewBox={`0 0 ${newElemProps.element.width * scale / 100} ${newElemProps.element.height * scale / 100}`}
                        width={newElemProps.element.width * scale / 100}>
                        {!newElemProps.element.only_indicator && <image href={newElemProps.element.image} x={0} y={0}
                                                                        width={newElemProps.element.width * scale / 100}/>}
                        <circle className={"circle"}
                                cx={newElemProps.element.indicator_x * scale / 100}
                                cy={newElemProps.element.indicator_y * scale / 100}
                                r={newElemProps.element.indicator_size * scale / 100}
                                fill={"black"} stroke="#000000" strokeWidth="0"/>
                    </svg>
                </div>
            }
            {addEditElementPopup && addEditElementPopup}
            {addEditPlacePopup && addEditPlacePopup}
            {addEditMapPopup && addEditMapPopup}
        </div>
    );
};

export default MapEdit;