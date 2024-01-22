import React, {useContext, useEffect, useRef, useState} from 'react';
import Canvas from "../../UI/Canvas/Canvas";
import "./MapEdit.css"
import "../Map/Map.css"
import Draggable from 'react-draggable';
import html2canvas from "html2canvas";
import DropDown, {IDropdownOption} from "../../UI/DropDown/DropDown";
import Button from "../../UI/Button/Button";
import {IInteractiveMap, IMap, IPlace} from "../../../models/models";
import InteractiveMapService from "../../../services/InteractiveMapService";
import {Context} from "../../../index";
import {Switch, ConfigProvider} from "antd";
import InteractiveMapEditService from "../../../services/InteractiveMapEditService";
import MapElements from "./MapElements/MapElements";
import {JSX} from "react/jsx-runtime";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

const MapEdit = () => {
    const {store} = useContext(Context)

    const [scale, setScale] = useState(100)
    const [floor, setFloor] = useState("Первый этаж")
    const [maps, setMaps] = useState<IMap[]>([])

    const [mapSel, setMapSel] = useState<string | undefined>("Выберите карту")
    const [interactiveMap, setInteractiveMap] = useState<IInteractiveMap>()
    const [places, setPlaces] = useState<IPlace[]>()

    const [canEditPosition, setCanEditPosition] = useState(false)

    const refMap = useRef(null)
    function downloadSVG() {
        // @ts-ignore
        html2canvas(document.querySelector("#MapEdit")).then(canvas => {
            let canvasUrl = canvas.toDataURL("image/jpeg", 0.5);
            console.log(canvasUrl);
            const createEl = document.createElement('a');
            createEl.href = canvasUrl;
            createEl.download = "download-this-canvas";
            createEl.click();
            createEl.remove();
        });
    }

    const changeScale = (e:any) => {
        if(e.target.className.baseVal !== "circle"){
            var delta = e.deltaY || e.detail || e.wheelDelta;
            if(delta < 0){
                setScale(scale + 10)
            }else if(scale > 70){
                setScale(scale - 10)
            }
        }
    }

    const getMaps = () => {
        store.DataLoadingON()
        InteractiveMapService.getMaps()
            .then((r) => {
                setMaps(r.data)
                setMapSel(r.data[0].name? r.data[0].name : "Выберите карту")
            })
            .catch()
            .finally(() => store.DataLoadingOFF())
    }

    const getMap = () => {
        store.DataLoadingON()
        InteractiveMapService.getMap({"Info1": mapSel})
            .then((r) => {
                setInteractiveMap(r.data)
                setPlaces(r.data.places)
            })
            .catch()
            .finally(() => store.DataLoadingOFF())
    }

    const changeFloor = (e:string) => {
        if(e !== mapSel){
            setMapSel(e)
        }
    }

    useEffect(() => {
        getMaps()
    },[])

    useEffect(() => {
        if(mapSel && mapSel !== "Выберите карту")
            getMap()
    },[mapSel])


    let ArrayMaps: IDropdownOption[] = []
    maps.map((item) => {
        ArrayMaps.push({name: item.name})
    })

    let listPlaces:JSX.Element[] = []

    places?.map((p, index) => {
        listPlaces.push(
            <Draggable
                bounds={{top: 0, left: 0, right: 1469, bottom: 863}}
                axis={"both"}
                defaultPosition={{x: p.x, y: p.y}}
                scale={scale/100}
                key={index}
                disabled={!canEditPosition}
                grid={[1,1]}

            >
                <g className={"interactiveMap-place"} key={index} data-id={p.id}>
                    <image href={p.image} width={p.width} x={0} y={0}/>
                    <circle className={"circle"} cx={p.width/2} cy={p.height/2} r="10" fill={"black"} stroke="#000000" strokeWidth="2"/>
                </g>

                {/*<g className={"interactiveMap-place"} key={index}>*/}
                {/*    /!*<circle className={"circle"} cx="20.999998" cy="20.999996" r="20" fill={"black"}*/}
                {/*            stroke="#000000"*/}
                {/*            strokeWidth="2"/>*!/*/}
                {/*    /!*<img src={p.image} width={20} height={20}/>*!/*/}

                {/*    <defs>*/}
                {/*        <pattern id="image" x="0" y="0" patternUnits="userSpaceOnUse" height="1" width="1">*/}
                {/*            <img src={p.image}></img>*/}
                {/*        </pattern>*/}
                {/*    </defs>*/}
                {/*    <circle id='top' cx="180" cy="120" r="80" fill="url(#image)"/>*/}
                {/*    <foreignObject className="node" x="46" y="22" width="100" height="100">*/}
                {/*        <div style={{border: "1px green solid"}}>I'm a div inside a SVG.</div>*/}
                {/*    </foreignObject>*/}
                {/*</g>*/}
            </Draggable>
        )
    })

    const SavePositionPlace = () => {
        let data:object[] = []

        let places = document.querySelectorAll(".interactiveMap-place")
        for (let i = 0; i < places.length; i++) {
            let transform = places[i]?.attributes.getNamedItem("transform")?.nodeValue
            let values = transform?.slice(10, transform.length-1).split(",")
            if (values) {
                data.push({
                    "id": places[i].attributes.getNamedItem("data-id")?.nodeValue,
                    "x": values[0],
                    "y": values[1]
                })
            }
        }
        //console.log(data)
        InteractiveMapEditService.savePositionPlaces({List: data})
    }

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
                        onChange={(e) => changeFloor(e)}
                        placeHolder={"Выберите этаж"}
                        size={"small"}/>
                    <div className={"interactiveMapEdit-panel-floor-btn"}>
                        <button><div></div></button>
                        <button><div></div></button>
                    </div>
                </div>
                <MapElements/>
            </div>
            {/*1509 903*/}
            {interactiveMap?.map &&

            <Draggable cancel={"g"} axis={"both"} scale={scale/100} bounds={{top: -interactiveMap?.map.height/2, left: -interactiveMap?.map.width/2, right: interactiveMap?.map.width/2, bottom: interactiveMap?.map.height/2}}>
                <div className={"interactiveMap-content"} style={{scale: `${scale}%`}} ref={refMap} onWheel = {(e) => changeScale(e)}>
                    <img src={interactiveMap?.map.image}/>

                    <svg viewBox={`0 0 ${interactiveMap?.map.width} ${interactiveMap?.map.height}`}>
                        {listPlaces}
                    </svg>
                </div>
            </Draggable>
            }
        </div>
    );
};

export default MapEdit;