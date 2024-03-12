import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import Canvas from "../../UI/Canvas/Canvas";
import "./Map.css"
import Draggable, {DraggableData, DraggableEvent} from 'react-draggable';
import html2canvas from "html2canvas";
import {set} from "mobx";
import DropDown, {IDropdownOption} from "../../UI/DropDown/DropDown";
import Button from "../../UI/Button/Button";
import MapFilter from "./MapFilter/MapFilter";
import {IElement, IHint, IInteractiveMap, IMap, IOption, IPlace} from "../../../models/models";
import InteractiveMapService from "../../../services/InteractiveMapService";
import {Context} from "../../../index";
import {JSX} from "react/jsx-runtime";
import InteractiveMapEditService from "../../../services/InteractiveMapEditService";
import AddEditPlace from "../MapEdit/AddEditPlace/AddEditPlace";
import AddEditElement from "../MapEdit/AddEditElement/AddEditElement";
import {ConfigProvider, Switch} from "antd";
import AddEditMap from "../MapEdit/AddEditMap/AddEditMap";
import MapElements from "../MapEdit/MapElements/MapElements";
import {useDate} from "../../../hooks/useDate";

const Map = () => {
    const {store} = useContext(Context)

    const [scale, setScale] = useState(100)
    const [maps, setMaps] = useState<IMap[]>([])

    const [mapSel, setMapSel] = useState<{ name: string, id: number | null }>({name: "Выберите карту", id: null})
    const [map, setMap] = useState<IMap>()
    const [interactiveMap, setInteractiveMap] = useState<IInteractiveMap>()
    const [places, setPlaces] = useState<IPlace[]>()

    const refMap = useRef<HTMLDivElement | null>(null)

    const [pos, setPos] = useState({x: 0, y: 0})

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
        InteractiveMapService.getMaps()
            .then((r) => {
                setMaps(r.data)
                setMapSel(r?.data[0]?.name ? {name: r.data[0].name, id: r.data[0].id} : {
                    name: "Выберите карту",
                    id: null
                })

            })
            .catch()
            .finally(() => store.DataLoadingOFF())
    }

    const getMap = (id: number) => {
        store.DataLoadingON()
        InteractiveMapService.getMap({"map_id": id})
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
        if (mapSel.name !== "Выберите карту" && mapSel.id) {
            getMap(mapSel.id)
        }
    }, [mapSel])

    const changeMap = (e: IDropdownOption) => {
        if (e.name !== mapSel.name && e.id) {
            setMapSel({name: e.name, id: e.id})
            setScale(100)
            setPos({x: 0, y: 0})
        }
    }

    let ArrayMaps: IDropdownOption[] = []
    maps.map((item) => {
        ArrayMaps.push({id: item.id, name: item.name})
    })

    useEffect(() => {
        getMaps()
    }, [])

    const time = useDate()

    const getFilteredMap = (selectedTypes:any, selectedDates:any, selectedOptions:any) => {
        console.log(selectedDates)
    }

    return (
        <div className={"interactiveMap"}>
            <div className={"interactiveMap-panel"}>
                <div className={"interactiveMap-panel-time"}>
                    <img src={"Pictures/timeIcon.svg"} alt={"time"}/>
                    {time.time}
                </div>
                <div className={"interactiveMap-panel-map"}>
                    <DropDown
                        value={mapSel.name}
                        options={ArrayMaps}
                        onChange={(e) => changeMap(e)}
                        placeHolder={"Выберите этаж"}
                        size={"small"}/>
                </div>
                <MapFilter options={interactiveMap?.options} onSelect={getFilteredMap}/>

            </div>
            {/*1509 903*/}
            {interactiveMap?.map &&
                <Draggable cancel={"g"} axis={"both"} scale={scale / 100} bounds={{
                    top: -interactiveMap?.map.height / 2,
                    left: -interactiveMap?.map.width / 2,
                    right: interactiveMap?.map.width / 2,
                    bottom: interactiveMap?.map.height / 2
                }}
                           position={pos}
                           onStop={(e, data) => {
                               setPos({x: data.x, y: data.y})
                           }}
                >
                    <div className={"interactiveMap-content"} style={{
                        scale: `${scale}%`,
                        width: `${interactiveMap?.map.width}px`,
                        height: `${interactiveMap?.map.height}px`
                    }} ref={refMap}
                         onWheel={(e) => changeScale(e)}
                    >
                        <img src={interactiveMap?.map.image}/>

                        <svg id={"svgMap"} viewBox={`0 0 ${interactiveMap?.map.width} ${interactiveMap?.map.height}`}>
                            {places?.map((p, index) => {
                                return (
                                    <Draggable disabled={true} defaultPosition={{x: p.x, y: p.y}}>
                                        <g className={"interactiveMap-place"} key={p.id} id={`place-${p.id}`}
                                           data-id={p.id}
                                           data-width={p.element.width} data-height={p.element.height}
                                           onClick={() => undefined}
                                        >
                                            {!p.element.only_indicator &&
                                                <image href={p.element.image} width={p.element.width} x={0} y={0}/>}


                                            {/*<circle className={"circle"}
                                                    cx={p.element.indicator_x}
                                                    cy={p.element.indicator_y}
                                                    r={p.element.indicator_size}
                                                    fill={'url("#image'} stroke="#000000" strokeWidth="0">
                                            </circle>*/}
                                            <defs>
                                                <clipPath id={`circleView${index}`}>
                                                    <circle cx={p.element.indicator_x} cy={p.element.indicator_y} r={p.element.indicator_size} fill="#FFFFFF" />
                                                </clipPath>
                                            </defs>
                                            <image
                                                x={p.element.indicator_x - p.element.indicator_size}
                                                y={p.element.indicator_y - p.element.indicator_size}
                                                width={p.element.indicator_size * 2}
                                                height={p.element.indicator_size * 2}
                                                href="/Pictures/canBronIcon.svg"
                                                clipPath={`url(#circleView${index})`}
                                            />
                                        </g>
                                    </Draggable>
                                )
                            })}
                        </svg>
                    </div>
                </Draggable>
            }

        </div>
    );
};

export default Map;