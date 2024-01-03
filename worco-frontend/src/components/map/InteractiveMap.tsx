import React, {useEffect, useRef, useState} from 'react';
import Canvas from "../CustomUI/Canvas/Canvas";
import "./InteractiveMap.css"
import Draggable from 'react-draggable';
import html2canvas from "html2canvas";

const InteractiveMap = () => {

    // const [canvas, setCanvas] = useState<HTMLCanvasElement | null>()
    // const [context, setContext] = useState<CanvasRenderingContext2D | null>()
    //
    // useEffect(() => {
    //
    //     if(context)
    //         context.fillRect(0, 0, 100, 100)
    //
    // }, [canvas, context])
    const map = useRef<HTMLDivElement | null>(null)
    // useEffect(() => {
    //     const contextMap = map.current
    //
    //     contextMap?.addEventListener("mousedown", (e) => {
    //         //contextMap.style.background = "red"
    //
    //         document.addEventListener("mousemove", () => {
    //             contextMap.style.left = e.pageX - 50 + "px";
    //             contextMap.style.top = e.pageY - 50 + "px";
    //         })
    //     })
    //
    //     contextMap?.addEventListener("mouseup", (e) => {
    //         //contextMap.style.background = "red"
    //         document.removeEventListener("mousemove", () => {
    //             contextMap.style.left = e.pageX - 50 + "px";
    //             contextMap.style.top = e.pageY - 50 + "px";
    //         })
    //     })
    // })

    // const [state, setState] = useState({
    //     activeDrags: 0,
    //     deltaPosition: {
    //         x: 0, y: 0
    //     },
    //     controlledPosition: {
    //         x: -400, y: 200
    //     }
    // })
    // const onStart = () => {
    //     setState({...state, activeDrags: ++state.activeDrags});
    // };
    //
    // const onStop = () => {
    //     setState({...state, activeDrags: --state.activeDrags});
    // };
    //const dragHandlers = {onStart: onStart(), onStop: onStop()};
    const [can, setCan] = useState(false)
    function downloadSVG() {
        // @ts-ignore
        html2canvas(document.querySelector("#map")).then(canvas => {
            let canvasUrl = canvas.toDataURL("image/jpeg", 0.5);
            console.log(canvasUrl);
            const createEl = document.createElement('a');
            createEl.href = canvasUrl;
            createEl.download = "download-this-canvas";
            createEl.click();
            createEl.remove();
        });
    }
    return (

        <div ref={map} style={{width: "100%", height: "700px", overflow: "hidden", position: "relative"}}>
            <button onClick={downloadSVG}>
                download
            </button>
            <Draggable cancel={"g"} bounds={{top: -500, left: -500, right: 500, bottom: 200}} axis={"both"} >
                <div id={"map"} className={"interactiveMap-container"}>
                    <img src={"/Pictures/office.jpg"}
                         style={{
                             objectFit: "cover",
                             width: "100%",
                             display: "block",
                             marginRight: "auto",
                             marginLeft: "auto",
                             height: "auto"
                         }}
                    />
                    <svg id={"svg"} viewBox="0 0 1509 903" style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}>

                        <Draggable

                            bounds={{top: 0, left: 0, right: 1469, bottom: 863}}
                            axis={"both"}
                            defaultPosition={{x: 100, y: 100}}
                        >
                            <g className={"g"}>

                                <circle className={"circle"} cx="20.999998" cy="20.999996" r="20" fill={"black"} stroke="#000000"
                                        strokeWidth="2"/>
                                <foreignObject className="node" x="46" y="22" width="100" height="100">

                                    <div style={{border:"1px green solid"}}>I'm a div inside a SVG.</div>
                                </foreignObject>
                            </g>
                        </Draggable>

                    </svg>
                </div>
            </Draggable>


            {/*<div ref={map} className={"interactiveMap-container"} >*/}

            {/*    <svg viewBox="0 0 10 10" x="200" width="100">*/}
            {/*        <circle cx="5" cy="5" r="4" />*/}
            {/*    </svg>*/}
            {/*</div>*/}
            {/*<Canvas getCanvas={(canvas) => setCanvas(canvas)} getContext={(context) => setContext(context)}/>*/}
        </div>
    );
};

export default InteractiveMap;