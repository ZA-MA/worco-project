import React, {useContext, useEffect, useRef, useState} from 'react';
import Canvas from "../../UI/Canvas/Canvas";
import "./Map.css"
import Draggable from 'react-draggable';
import html2canvas from "html2canvas";
import {set} from "mobx";
import DropDown, {IDropdownOption} from "../../UI/DropDown/DropDown";
import Button from "../../UI/Button/Button";
import MapFilter from "./MapFilter/MapFilter";
import {IInteractiveMap, IMap} from "../../../models/models";
import InteractiveMapService from "../../../services/InteractiveMapService";
import {Context} from "../../../index";

const Map = () => {
    const {store} = useContext(Context)

    const [scale, setScale] = useState(100)
    const [floor, setFloor] = useState("Первый этаж")
    const [maps, setMaps] = useState<IMap[]>([])

    const [mapSel, setMapSel] = useState<string | undefined>("Выберите карту")
    const [interactiveMap, setInteractiveMap] = useState<IInteractiveMap>()

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

    interactiveMap?.places.map((p, index) => {
        if(p.visible)
            listPlaces.push(
                    <g className={"interactiveMap-place"} key={index}>
                        <image href={p.image} width={p.width} x={p.x} y={p.y}></image>
                        <foreignObject className="interactiveMap-place-info" width="300" height="100" x={p.x + p.width/2 - 150} y={p.y + p.height}>
                            <div style={{border: "1px green solid"}}>I'm a div inside a SVG.</div>
                        </foreignObject>
                    </g>
            )
    })

    //console.log(window.innerWidth / window.innerHeight) 100-
    return (
        <div className={"interactiveMap"}>
            <div className={"interactiveMap-panel"}>
                <div className={"interactiveMap-panel-places"}>
                    <Button type={"white1"} onClick={() => console.log(123)} size={"small"} selected={true}>
                        Места
                    </Button>
                    <Button type={"white1"} onClick={() => console.log(123)} size={"small"}>
                        Переговорные
                    </Button>
                    <Button type={"white1"} onClick={() => console.log(123) } size={"small"}>
                        Кабинеты
                    </Button>
                </div>
                <div className={"interactiveMap-panel-floor"}>
                    <DropDown
                        value={mapSel}
                        options={ArrayMaps}
                        onChange={(e) => changeFloor(e)}
                        placeHolder={"Выберите этаж"}
                        size={"small"}/>
                </div>
                <MapFilter/>
            </div>

            <Draggable cancel={"g"} axis={"both"} scale={scale/100}>
                <div className={"interactiveMap-content"} style={{scale: `${scale}%`}} ref={refMap} onWheel = {(e) => changeScale(e)}>
                    <img src={interactiveMap?.map.image}/>

                    <svg viewBox="0 0 1509 903">
                        {listPlaces}
                    </svg>
                </div>
            </Draggable>
        </div>
    );
};

export default Map;