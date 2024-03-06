import React, {useEffect, useRef, useState} from 'react';
import "./AddEditElement.css"
import {IElement, INewElement} from "../../../../models/models";
import NavigateHeader from "../../../UI/NavigateHeader/NavigateHeader";
import DropDown from "../../../UI/DropDown/DropDown";
import Input from "../../../UI/Input/Input";
import {ConfigProvider, Switch} from "antd";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import Button from "../../../UI/Button/Button";
import GlobalService from "../../../../services/GlobalService";
import InteractiveMapEditService from "../../../../services/InteractiveMapEditService";

interface IAddEditElement {
    onClose: () => void,
    elementProps?: IElement,
    isAdd: boolean,
    onAddEditEnd: () => void,
}

const AddEditElement = ({onClose, elementProps, isAdd, onAddEditEnd}: IAddEditElement) => {
    const [element, setElement] = useState<IElement>({
        id: 0,
        type: "",
        image: "",
        width: 0,
        height: 0,
        only_indicator: false,
        indicator_x: 0,
        indicator_y: 0,
        indicator_size: 0,
        options: ""
    })


    const [elementFile, setElementFile] = useState<File>()
    const [elementPreview, setElementPreview] = useState<string | undefined>(elementProps?.image ? elementProps.image : undefined)

    const [drag, setDrag] = useState(false)
    const inputRef = useRef(null);

    const [onlyIndicator, setOnlyIndicator] = useState(false)

    useEffect(() => {
        if (!isAdd && elementProps) {
            setElement(elementProps)
            setElementPreview(elementProps?.image)
            setOnlyIndicator(elementProps.only_indicator)
        }

    }, [])

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
            //setElementPreview(undefined)
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
                    only_indicator: false,
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
        if (element?.width && element.height)
            if (element?.width >= element?.height) setScale(300 / element.width)
            else setScale(300 / element.height)
    }, [element?.width, element?.height])

    const onlyIndicatorVis = (e: boolean) => {
        if (e) {
            setOnlyIndicator(e)
            setElement(
                {
                    ...element,
                    width: 300,
                    height: 300,
                    only_indicator: true,
                    indicator_size: 300 / 2,
                    indicator_x: 300 / 2,
                    indicator_y: 300 / 2
                })
        } else {
            setOnlyIndicator(e)

        }
    }

    const onChangeSettings = (type: "width" | "height" | "indicator_size", value: number) => {
        switch (type) {
            case "width":
                !onlyIndicator ?
                    setElement({...element, width: value}) :
                    setElement({
                        ...element,
                        width: value,
                        height: value,
                        indicator_size: value / 2,
                        indicator_x: value / 2,
                        indicator_y: value / 2
                    })
                break;
            case "height":
                !onlyIndicator ?
                    setElement({...element, height: value}) :
                    setElement({
                        ...element,
                        width: value,
                        height: value,
                        indicator_size: value / 2,
                        indicator_x: value / 2,
                        indicator_y: value / 2
                    })
                break;
            case "indicator_size":
                !onlyIndicator ?
                    setElement({...element, indicator_size: value}) :
                    setElement({
                        ...element,
                        width: value * 2,
                        height: value * 2,
                        indicator_size: value,
                        indicator_x: value,
                        indicator_y: value
                    })
                break;
        }
    }

    const onSave = async () => {
        if (isAdd) {
            if (element !== undefined) {
                var newElement = element
                if (!onlyIndicator && elementFile) {
                    const formData = new FormData();
                    formData.append('image', elementFile);
                    newElement.image = await GlobalService.addNewImage(formData).then(r => r.data.data.link)
                }
                await InteractiveMapEditService.addUpdateElement(newElement)
            }
        } else {
            if (element !== undefined) {
                var updateElement = element
                if (updateElement.image !== elementProps?.image && elementFile) {
                    const formData = new FormData();
                    formData.append('image', elementFile);
                    updateElement.image = await GlobalService.addNewImage(formData).then(r => r.data.data.link)
                }
                await InteractiveMapEditService.addUpdateElement(updateElement)
            }
        }
        onAddEditEnd()
        onClose()
    }

    const onDelete = () => {
        if (window.confirm("Вы точно хотите удалить этот элемент?")) {
            if(element?.id)
            InteractiveMapEditService.deleteElement(element?.id)
                .then((r) => {
                    if (r.status === 200) {
                        alert("Элемент удален")
                        onAddEditEnd()
                        onClose()
                    }
                })
                .catch((error) => {
                    if(error.response.data.status === "Error_1")
                        alert("Такого элемента не существует")
                    else if(error.response.data.status === "Error_2")
                        alert("Этот элемент нельзя удалить, так как он уже используется")
                    else
                        alert("Что-то пошло не так, попробуйте позже")
                })
        }
    }

    return (
        <div className={"addEditElement-bg"}>
            <div className={"addEditElement"}>
                <NavigateHeader onClick={onClose} size={"small"}
                                Text={isAdd ? "Добавление нового элемента" : "Редактирование элемента"}/>
                <div className={"addEditElement-content"}>

                    <div className={"addEditElement-name"}>
                        Тип
                        <DropDown
                        options={[{name: "Место"}, {name: "Переговорная"}, {name: "Кабинет"}]} value={element?.type}
                        onChange={(val) => setElement({...element, type: val})} placeHolder={"Выберите название"}
                        disabled={!!element?.type}
                        size={"small"}/>
                    </div>

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
                                {elementPreview || onlyIndicator ?
                                    // {x: element?.width? element?.width / 2 : 0, y: element?.height? element?.height / 2 : 0}
                                    <div className={"addEditElement-preview-hints"}>
                                        <div className={"addEditElement-preview"}>
                                            <svg viewBox={`0 0 ${element?.width} ${element?.height}`}
                                                 style={element?.width && element.height && element?.width >= element.height ? {width: "100%"} : {height: "100%"}}>

                                                {!onlyIndicator &&
                                                    <image href={elementPreview} x={0} y={0} width={element?.width}/>
                                                }


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
                                                                stroke="#000000" strokeWidth="0"/>
                                                    </Draggable>
                                                }
                                                {!onlyIndicator &&
                                                    <>
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
                                                    </>}
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
                            {isAdd &&
                                <>
                                    <input
                                        disabled={!element?.type}
                                        ref={inputRef}
                                        style={{display: 'none'}}
                                        type="file"

                                        name={"profilePicture"}
                                        onChange={selectProductPicture}
                                        accept="image/jpeg, image/png"
                                    />

                                    <Button size={"small"} type={"white2"} disabled={!element?.type || onlyIndicator}
                                            onClick={onBtnPictureClick}>Обзор</Button>
                                </>
                            }
                        </div>

                        <div className={"addEditElement-preview-settings"}>
                            <div className={"addEditElement-preview-settings-content"}>
                                <div className={"addEditElement-preview-setting"}>
                                    Ширина элемента <Input type={"number"} inputSize={"small"} value={element?.width}
                                                           disabled={!element?.type}
                                                           onChange={(event) => onChangeSettings("width", Number(event.target.value))}/>
                                </div>
                                <div className={"addEditElement-preview-setting"}>
                                    Высота элемента <Input type={"number"} inputSize={"small"} value={element?.height}
                                                           disabled={!element?.type}
                                                           onChange={(event) => onChangeSettings("height", Number(event.target.value))}/>
                                </div>
                                <div className={"addEditElement-preview-setting"}>
                                    Размер индикатора <Input type={"number"} inputSize={"small"}
                                                             disabled={!element?.type}
                                                             value={element?.indicator_size}
                                                             onChange={(event) => onChangeSettings("indicator_size", Number(event.target.value))}/>
                                </div>
                                {isAdd &&
                                    <div className={"addEditElement-preview-setting"}>
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
                                                <Switch disabled={!element?.type}
                                                        onChange={(e) => onlyIndicatorVis(e)}/>
                                            </ConfigProvider>
                                        </div>
                                    </div>
                                }
                                {!onlyIndicator &&
                                    <div className={"addEditElement-preview-setting"}>
                                        <div>
                                            <Button onClick={indicatorCenter} disabled={!element?.type}
                                                    size={"small"}> Отцентровать индикатор</Button>
                                        </div>
                                    </div>
                                }
                                {isAdd&&
                                <div className={"addEditElement-preview-setting-options"}>
                                    Опции
                                    <Input type={"text"} inputSize={"small"} value={element.options} onChange={(e) => setElement({...element, options: e.target.value.trim()})}/>
                                </div>
                                }
                            </div>
                            <div className={"addEditElement-buttons"}>
                                {!isAdd &&
                                    <button className={"addEditElement-buttons-delete"} onClick={onDelete}>
                                        <div></div>
                                    </button>
                                }
                                <Button onClick={onClose} type={"white2"} size={"small"}>
                                    Отменить
                                </Button>
                                <Button onClick={onSave} type={"black"} size={"small"}>
                                    {isAdd ? "Добавить" : "Сохранить"}
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