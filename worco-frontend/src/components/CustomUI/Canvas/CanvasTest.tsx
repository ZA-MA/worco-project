import React, {useEffect, useRef, useState} from 'react';

const CanvasTest = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)


    const image = new Image(100, 100)
    image.src = "/Pictures/NiceImage.png"
    let moving = false;
    const draw = function (context:any, x1?:number, y1?:number, x2?:number, y2?:number)  {
        image.onload = function (){ context.drawImage(image, x1? x1: 0, y1? y1: 0, x2? x2: 100, y2? y2: 100)}
    }

    function getCursorPosition(canvas:any, event:any) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return {x, y}
    }
    function getMousePos(canvas:any, evt:any) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }

    const [movingState, setMovingState] = useState(false)
    const canvas = canvasRef.current

    useEffect(() => {

        const canvas = canvasRef.current
        if(!canvas)
            return;
        const context = canvas?.getContext('2d')
        if(!context)
            return;
        draw(context);

        const animate = () => {
                requestAnimationFrame(animate)
                context.clearRect(0, 0, 800, 800)
                context.drawImage(image, a.x-50, a.y-50, 100, 100)
                //setTimeout(() => 1)


        }
        let a = {x: 0, y: 0};

        canvas.onmousedown = function(e){
            moving = true
            setMovingState(true)
        };

        canvas.onmousemove = function(e){
            if(moving)
            {

                a = getCursorPosition(canvas, e)
                animate();




            }

        };

        canvas.onmouseup = function(evt){
            moving = false;
            setMovingState(false)
        };

        window.addEventListener("keydown", (e) => {
            if(e.key == "s"){
                context.translate(300, 300)
            }
        }, false)

        // canvas.onkeydown = function (e){
        //     console.log(e.key)
        //     console.log(123)
        //     context.translate(300, 300)
        // }

        context.strokeRect(0, 0, 800, 800)
        //contex.fillRect(0, 0, 100, 100)

    }, [])
    const download = () => {

        if(canvas){
            let canvasUrl = canvas.toDataURL("image/svg", 0.5);
            console.log(canvasUrl);
            const createEl = document.createElement('a');
            createEl.href = canvasUrl;
            createEl.download = "download-this-canvas";
            createEl.click();
            createEl.remove();
        }
        else
            return;
    }
    return (
        <>
        <button onClick={() => download()}>sad</button>
        <canvas className={"MainCanvas"} style={{cursor: movingState? "grab" : ""}} ref={canvasRef} width={800} height={600}/>
    </>);
};

export default CanvasTest;