import React, {useEffect, useRef, useState} from 'react';

interface ICanvas{
    getCanvas: (canvas:any) => void;
    getContext: (context:any) => void;
}
const CanvasTest = ({getCanvas, getContext}:ICanvas) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {

        const canvas = canvasRef.current
        if(!canvas)
            return;
        else
            getCanvas(canvas)
        const context = canvas?.getContext('2d')
        if(!context)
            return;
        else
            getContext(context)


        context.fillStyle = "red";
        context.fillRect(0, 0, 100, 100)
    }, [])

    return (
        <>
            <canvas className={"MainCanvas"} width={800} height={600}/>
        </>);
};

export default CanvasTest;