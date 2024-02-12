import React, {useEffect, useRef, useState} from 'react';
import "./AddEditElement.css"
import {IElement, INewElement} from "../../../../models/models";
import NavigateHeader from "../../../UI/NavigateHeader/NavigateHeader";
import DropDown from "../../../UI/DropDown/DropDown";
import Input from "../../../UI/Input/Input";
import {ConfigProvider, Switch} from "antd";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import Button from "../../../UI/Button/Button";

interface IAddEditElement {
    onClose: () => void,
    elementProps?: IElement,
    isAdd: boolean
}

const AddEditElement = ({onClose, elementProps, isAdd}: IAddEditElement) => {
    const [element, setElement] = useState<IElement | INewElement>()
    if (!isAdd && elementProps) setElement(elementProps)

    const [elementFile, setElementFile] = useState<File>()
    const [elementPreview, setElementPreview] = useState<string>()

    const [drag, setDrag] = useState(false)
    const inputRef = useRef(null);

    const [onlyIndicator, setOnlyIndicator] = useState(false)

    const selectProductPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            setElementPreview(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setElementFile(event.target.files[event.target.files.length - 1])
    };

    const onBtnPictureClick = () => {
        // @ts-ignore
        inputRef.current?.click();
    }

    const dragOver = (e: any) => {
        e.preventDefault();
    }
    const dragEnter = (e: any) => {
        e.preventDefault();
        setDrag(true)
    }

    const dragLeave = (e: any) => {
        e.preventDefault();
        setDrag(false)
    }

    const fileDrop = (e: any) => {
        e.preventDefault();
        setElementFile(e.dataTransfer.files[e.dataTransfer.files.length - 1])
        setDrag(false)
    }

    let indicator_x = 0
    let indicator_y = 0

    const onDragIndicator = (event: DraggableEvent, data: DraggableData) => {
        setElement({...element, indicator_x: data.x, indicator_y: data.y})
    }

    const onStopIndicator = (event: DraggableEvent, data: DraggableData) => {

    }

    const indicatorCenter = () => {
        if (element?.width && element?.height)
            setElement({...element, indicator_x: element?.width / 2, indicator_y: element?.height / 2})
    }

    useEffect(() => {
        if (!elementFile) {
            setElementPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(elementFile)
        setElementPreview(objectUrl)

        let img = new Image()
        img.onload = () => {
            setElement(
                {
                    ...element,
                    width: img.width,
                    height: img.height,
                    indicator_visible: true,
                    indicator_size: Math.floor(img.height / 3),
                    indicator_x: img.width / 2,
                    indicator_y: img.height / 2
                })
        }
        img.src = objectUrl


        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [elementFile])

    const [scale, setScale] = useState<number>(0)

    useEffect(() => {
        if(element?.width && element.height)
            if(element?.width >= element?.height) setScale(300 / element.width)
            else setScale(300 / element.height)
    }, [element?.width, element?.height])

    return (
        <div className={"addEditElement-bg"}>
            <div className={"addEditElement"}>
                <NavigateHeader onClick={onClose} size={"small"}
                                Text={isAdd ? "Добавление нового элемента" : "Редактирование элемента"}/>
                <div className={"addEditElement-content"}>

                    <div className={"addEditElement-name"}> Тип <DropDown
                        options={[{name: "Место"}, {name: "Переговорная"}, {name: "Кабинет"}]} value={element?.type}
                        onChange={(val) => setElement({...element, type: val})} placeHolder={"Выберите название"}
                        size={"small"}/></div>

                    <div className={"addEditElement-preview-settings-container"}>
                        <div className={"addEditElement-preview-container"}>
                            <div className={"addEditElement-hint-text"}>Предпросмотр</div>
                            <div
                                className={"addEditElement-photo-image" + (drag && element?.type && isAdd ? " addEditElement-photo-image-dragEnter" : "")}
                                onDragOver={dragOver}
                                onDragEnter={dragEnter}
                                onDragLeave={dragLeave}
                                onDrop={isAdd && element?.type ? fileDrop : () => undefined}
                            >
                                {elementPreview ?
                                    // {x: element?.width? element?.width / 2 : 0, y: element?.height? element?.height / 2 : 0}
                                    <div className={"addEditElement-previewNhints"}>
                                        <div className={"addEditElement-preview"}>
                                            <svg viewBox={`0 0 ${element?.width} ${element?.height}`} style={element?.width && element.height&& element?.width >= element.height? {width: "100%"} : {height: "100%"}}>

                                                    <image href={elementPreview} x={0} y={0} width={element?.width}/>

                                                {element?.width && element.height && element.indicator_size &&
                                                    <Draggable
                                                        grid={[5, 5]}
                                                        axis={"both"}
                                                        bounds={{
                                                            top: element.indicator_size ? element.indicator_size : 0,
                                                            left: element.indicator_size ? element.indicator_size : 0,
                                                            right: element.width && element.indicator_size && element.width - element.indicator_size,
                                                            bottom: element.height && element.indicator_size && element.height - element.indicator_size
                                                        }}
                                                        position={{
                                                            x: element.indicator_x ? element.indicator_x : 0,
                                                            y: element.indicator_y ? element.indicator_y : 0
                                                        }}
                                                        scale={scale}
                                                        onDrag={(event, data) => onDragIndicator(event, data)}
                                                        onStop={(event, data) => onStopIndicator(event, data)}
                                                    >
                                                        <circle className={"circle"}
                                                                r={element?.indicator_size} fill={"black"}
                                                                stroke="#000000" strokeWidth="2"/>
                                                    </Draggable>
                                                }
                                                <g className={"addEditElement-hintPos"}>
                                                    <line
                                                        x1={0}
                                                        y1={element?.indicator_y}
                                                        x2={element?.indicator_size && element.indicator_x && element.indicator_x - element.indicator_size}
                                                        y2={element?.indicator_y}
                                                        strokeWidth={element?.indicator_size && element?.width && element?.height ? 1 / (300 / element.width) : 1}
                                                        stroke={element?.height && element.indicator_y && element?.height / 2 === element.indicator_y ? "red" : "orange"}></line>
                                                    {/*<foreignObject
                                                        width={ 15 / scale}
                                                        height={10 / scale}
                                                        x={0}
                                                        y={element?.width && element.indicator_y ? element.indicator_y - 5 / (300 / element.width) : 1}>
                                                        <div>123</div>
                                                    </foreignObject>*/}
                                                </g>
                                                <g className={"addEditElement-hintPos"}>
                                                    <line
                                                        x1={element?.indicator_x}
                                                        y1={0}
                                                        x2={element?.indicator_x}
                                                        y2={element?.indicator_y && element.indicator_size && element?.indicator_y - element.indicator_size}
                                                        strokeWidth={element?.indicator_size && element?.width && element?.height ? 1 / (300 / element.width) : 1}
                                                        stroke={element?.width && element.indicator_x && element?.width / 2 === element.indicator_x ? "red" : "orange"}></line>
                                                    {/*<foreignObject*/}
                                                    {/*    width={ 15 / scale}*/}
                                                    {/*    height={10 / scale}*/}
                                                    {/*    x={element?.width && element.indicator_x ? element.indicator_x - 8 / (300 / element.width) : 1}*/}
                                                    {/*    y={0}>*/}
                                                    {/*    <div>123</div>*/}
                                                    {/*</foreignObject>*/}
                                                </g>
                                                <g className={"addEditElement-hintPos"}>
                                                    <line
                                                        x1={element?.indicator_x}
                                                        y1={element?.indicator_size && element.indicator_y && element?.indicator_y + element.indicator_size}
                                                        x2={element?.indicator_x}
                                                        y2={element?.height}
                                                        strokeWidth={element?.indicator_size && element?.width && element?.height ? 1 / (300 / element.width) : 1}
                                                        stroke={element?.width && element.indicator_x && element?.width / 2 === element.indicator_x ? "red" : "orange"}></line>
                                                    {/*<foreignObject
                                                        width={ 15 / scale}
                                                        height={10 / scale}
                                                        x={element?.width && element.indicator_x ? element.indicator_x - 8 / (300 / element.width) : 1}
                                                        y={element?.height && element?.height - 10 / scale}>
                                                        <div>123</div>
                                                    </foreignObject>*/}
                                                </g>
                                                <g className={"addEditElement-hintPos"}>
                                                    <line
                                                        x1={element?.indicator_size && element.indicator_x && element.indicator_x + element.indicator_size}
                                                        y1={element?.indicator_y}
                                                        x2={element?.width && element?.width - 1}
                                                        y2={element?.indicator_y}
                                                        strokeWidth={element?.indicator_size && element?.width && element?.height ? 1 / (300 / element.width) : 1}
                                                        stroke={element?.height && element.indicator_y && element?.height / 2 === element.indicator_y ? "red" : "orange"}></line>
                                                    {/*<foreignObject
                                                        width={ 15 / scale}
                                                        height={10 / scale}
                                                        x={element?.width && element?.width - 15 / scale}
                                                        y={element?.width && element.indicator_y ? element.indicator_y - 5 / scale : 1}>
                                                        <div>123</div>
                                                    </foreignObject>*/}
                                                </g>
                                            </svg>
                                        </div>
                                        {/*<div className={"addEditElement-preview-pos"}>*/}
                                        {/*    <svg className={"addEditElement-hintPos"}*/}
                                        {/*         viewBox={`0 0 ${element?.width} ${element?.height}`} >*/}
                                        {/*        */}
                                        {/*    </svg>*/}
                                        {/*</div>*/}
                                    </div>
                                    :
                                    <div className={"addEditElement-photo-image-text"}>Поместите сюда фото</div>
                                }
                            </div>
                            <input
                                disabled={!element?.type}
                                ref={inputRef}
                                style={{display: 'none'}}
                                type="file"

                                name={"profilePicture"}
                                onChange={selectProductPicture}
                                accept="image/*"
                            />
                            <Button size={"small"} type={"white2"} disabled={!element?.type}
                                    onClick={onBtnPictureClick}>Обзор</Button>
                        </div>
                        <div className={"addEditElement-preview-settings"}>
                            <div className={"addEditElement-preview-settings-width"}>
                                Ширина элемента <Input type={"number"} inputSize={"small"} value={element?.width}
                                                       onChange={(event) => setElement({
                                                           ...element,
                                                           width: Number(event.target.value)
                                                       })}/>
                            </div>
                            <div className={"addEditElement-preview-settings-height"}>
                                Высота элемента <Input type={"number"} inputSize={"small"} value={element?.height}
                                                       onChange={(event) => setElement({
                                                           ...element,
                                                           height: Number(event.target.value)
                                                       })}/>
                            </div>
                            <div className={"addEditElement-preview-settings-width"}>
                                Размер индикатора <Input type={"number"} inputSize={"small"} disabled={!element?.type}
                                                         value={element?.indicator_size}
                                                         onChange={(event) => setElement({
                                                             ...element,
                                                             indicator_size: Number(event.target.value)
                                                         })}/>
                            </div>
                            <div className={"addEditElement-preview-settings-height"}>
                                Только индикатор
                                <div>
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
                                        <Switch disabled={!element?.type} onChange={(e) => setOnlyIndicator(e)}/>
                                    </ConfigProvider>
                                </div>
                            </div>
                            <div className={"addEditElement-preview-settings-height"}>
                                <div>
                                    <Button onClick={indicatorCenter} disabled={!element?.type}
                                            size={"small"}> Отцентровать индикатор</Button>
                                </div>
                            </div>
                            <div className={"addEditElement-buttons"}>
                                <Button onClick={() => undefined} type={"black"} size={"small"}>
                                    {isAdd? "Добавить" : "Сохранить"}
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddEditElement;