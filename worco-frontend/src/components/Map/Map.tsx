import React, {useEffect, useRef, useState} from 'react';
import Canvas from "../CustomUI/Canvas/Canvas";
import "./Map.css"
import Draggable from 'react-draggable';
import html2canvas from "html2canvas";
import {set} from "mobx";

const Map = () => {
    const [scale, setScale] = useState(100)

    function downloadSVG() {
        // @ts-ignore
        html2canvas(document.querySelector("#Map")).then(canvas => {
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
        var delta = e.deltaY || e.detail || e.wheelDelta;
        if(delta < 0){
            setScale(scale + 10)
        }else if(scale > 70){
            setScale(scale - 10)
        }
    }

    //console.log(window.innerWidth / window.innerHeight) 100-
    return (
        <div className={"interactiveMap"} onWheel = {(e) => changeScale(e)}>
            <div className={"interactiveMap-panel"}>
                <div className={"interactiveMap-panel-places"}>
                    <div>Места</div>
                    <div>Переговорные</div>
                    <div>Кабинеты</div>
                </div>
                <div className={"interactiveMap-panel-floor"}>Этаж - 1 ^</div>
                <div className={"interactiveMap-panel-filter"}>Фильтр</div>
            </div>
            <Draggable cancel={"g"} axis={"both"} scale={scale/100}>
                <div id={"map"} className={"interactiveMap-content"} style={{scale: `${scale}%`}}>
                    <img src={"/Pictures/office.jpg"}/>

                    <svg id={"svg"} viewBox="0 0 1509 903">
                        <Draggable
                            bounds={{top: 0, left: 0, right: 1469, bottom: 863}}
                            axis={"both"}
                            defaultPosition={{x: 100, y: 100}}
                            scale={scale/100}
                        >
                            <g className={"interactiveMap-place"}>
                                <circle className={"circle"} cx="20.999998" cy="20.999996" r="20" fill={"black"}
                                        stroke="#000000"
                                        strokeWidth="2"/>
                                <foreignObject className="node" x="46" y="22" width="100" height="100">
                                    <div style={{border: "1px green solid"}}>I'm a div inside a SVG.</div>
                                </foreignObject>
                            </g>
                        </Draggable>

                    </svg>
                </div>
            </Draggable>
        </div>
    );
};

export default Map;