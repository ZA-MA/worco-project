import React, {useEffect, useRef, useState} from 'react';
import NavigateHeader from "../../../UI/NavigateHeader/NavigateHeader";
import {IMap} from "../../../../models/models";
import Input from "../../../UI/Input/Input";
import {ConfigProvider, Switch} from "antd";
import Draggable from "react-draggable";
import Button from "../../../UI/Button/Button";
import "./AddEditMap.css"
import InteractiveMapEditService from "../../../../services/InteractiveMapEditService";
import GlobalService from "../../../../services/GlobalService";

interface IAddEditMap {
    isAdd: boolean,
    onClose: () => void,
    mapProps?: IMap,
    onDataUpdate: () => void
}

const AddEditMap = ({isAdd, onClose, mapProps, onDataUpdate}: IAddEditMap) => {
    const [map, setMap] = useState<IMap>(
        {
            id: 0,
            name: "",
            activity: false,
            image: "",
            width: 0,
            height: 0
        }
    )

    const [drag, setDrag] = useState(false)
    const inputRef = useRef(null);

    const [mapFile, setMapFile] = useState<File>()
    const [mapPreview, setMapPreview] = useState<string | undefined>()

    useEffect(() => {
        if (!isAdd && mapProps) {
            setMap(mapProps)
            setMapPreview(mapProps.image)
        }
    }, [])

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
        setMapFile(e.dataTransfer.files[e.dataTransfer.files.length - 1])
        setDrag(false)
    }

    const selectProductPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            setMapPreview(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setMapFile(event.target.files[event.target.files.length - 1])
    };

    const onBtnPictureClick = () => {
        // @ts-ignore
        inputRef.current?.click();
    }

    useEffect(() => {
        if (!mapFile) {
            //setElementPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(mapFile)
        setMapPreview(objectUrl)

        let img = new Image()
        img.onload = () => {
            setMap(
                {
                    ...map,
                    width: img.width,
                    height: img.height,
                })
        }
        img.src = objectUrl

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [mapFile])

    const onSave = async () => {
        if (isAdd) {
            if (map !== undefined) {
                var newMap = map
                if (mapFile) {
                    const formData = new FormData();
                    formData.append('image', mapFile);
                    newMap.image = await GlobalService.addNewImage(formData).then(r => r.data.data.link)
                }
                await InteractiveMapEditService.addUpdateMap(newMap)
            }
        } else {
            InteractiveMapEditService.addUpdateMap(map)
                .then(() => {
                    if (isAdd)
                        alert("Карта успешно добавлена")
                    else
                        alert("Карта успешно изменена")
                })
                .catch(() => alert("Что-то пошло не так"))
        }
        onDataUpdate()
        onClose()
    }

    const onDelete = () => {
        if(window.confirm("Вы точно хотиту удалить эту карту?\nПри удалении карты так же удаляться все места на ней")){
            InteractiveMapEditService.deleteMap(map.id)
                .then(() => {
                    alert("Карта была удалена")
                    onDataUpdate()
                    onClose()
                })
                .catch(() => alert("Что-то пошло не так"))
        }
    }

    return (
        <div className={"addEditMap"}>
            <div className={"addEditMap-content"}>
                <NavigateHeader onClick={onClose} size={"small"}
                                Text={isAdd ? `Добавление новой карты` : "Редактирование карты"}/>
                <div className={"addEditMap-settings"}>
                    <div className={"addEditMap-setting-name"}>
                        Название
                        <Input inputSize={"small"} type={"text"} value={map.name}
                               onChange={(e) => {
                                   setMap({...map, name: e.target.value})
                               }}
                        />
                    </div>
                    <div className={"addEditMap-setting-activity"}>
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
                            Активность
                            <Switch value={map.activity}
                                    onChange={(e) => setMap({...map, activity: e})}/>
                        </ConfigProvider>
                    </div>
                </div>

                <div className={"addEditMap-preview-container"}>
                    <div className={"addEditMap-hint-text"}>Предпросмотр</div>
                    <div
                        className={"addEditMap-photo-image" + (drag && isAdd ? " addEditMap-photo-image-dragEnter" : "")}
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={isAdd ? fileDrop : () => undefined}
                    >
                        {mapPreview ?
                            <img src={mapPreview}/>
                            :
                            <div className={"addEditMap-photo-image-text"}>Поместите сюда фото</div>
                        }
                    </div>
                    <div >
                        Ширина: {map.width? map.width : 0} Высота: {map.height? map.height : 0}
                    </div>
                    {isAdd &&
                        <div className={"addEditMap-preview-button"}>
                            <input
                                ref={inputRef}
                                style={{display: 'none'}}
                                type="file"
                                name={"profilePicture"}
                                onChange={selectProductPicture}
                                accept="image/jpeg, image/png"
                            />
                            <Button size={"small"} type={"white2"}
                                    onClick={onBtnPictureClick}>Обзор</Button>
                        </div>
                    }
                </div>
                <div className={"addEditMap-buttons"}>
                    {!isAdd &&
                        <button className={"addEditMap-buttons-delete"} onClick={onDelete}>
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
    );
};

export default AddEditMap;