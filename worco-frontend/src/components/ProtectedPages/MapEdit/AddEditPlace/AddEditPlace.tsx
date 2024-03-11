import React, {useContext, useEffect, useState} from 'react';
import "./AddEditPlace.css"
import {IPlace} from "../../../../models/models";
import NavigateHeader from "../../../UI/NavigateHeader/NavigateHeader";
import Input from "../../../UI/Input/Input";
import {ConfigProvider, Switch} from "antd";
import DropDown from "../../../UI/DropDown/DropDown";
import Draggable from "react-draggable";
import Button from "../../../UI/Button/Button";
import InteractiveMapEditService from "../../../../services/InteractiveMapEditService";
import {Context} from "../../../../index";

interface IAddEditPlace {
    placeProps: IPlace,
    placeId?: number | undefined,
    isAdd: boolean,
    onClose: () => void,
    onUpdateData: () => void,
    is_now_bron?: boolean,
    is_any_bron?: boolean
}

const AddEditPlace = ({placeProps, placeId, isAdd, onClose, is_now_bron, is_any_bron, onUpdateData}: IAddEditPlace) => {
    const [place, setPlace] = useState(placeProps)

    const {store} = useContext(Context)

    const onSave = () => {
        InteractiveMapEditService.addUpdatePlace(place)
            .then(() => {
                if (isAdd)
                    alert("Рабочее пространство успешно добавлено")
                else
                    alert("Рабочее пространство успешно изменено")
                onClose()
                onUpdateData()
            })
            .catch(() => alert("Что-то пошло не так"))
    }
    const onDelete = () => {
        if (window.confirm("Вы точно хотите удалить это рабочее пространство?")) {
            InteractiveMapEditService.deletePlace(place.id)
                .then(() => {
                    alert("Рабочее пространство удалено")
                    onClose()
                    onUpdateData()
                })
                .catch(() => alert("Что-то пошло не так"))
        }
    }

    let optionsList: JSX.Element[] = []

    place?.options?.map((o, index) => {
        console.log(place)
        optionsList.push(
            <div>
                {o.option}
                <Switch value={o.active}
                        onChange={(e) => {
                            let opt = place.options
                            opt[index].active = e
                            setPlace({...place, options: opt})
                        }}/>
            </div>
        )
    })

    return (
        <div className={"addEditPlace"}>
            <div className={"addEditPlace-content"}>
                <NavigateHeader onClick={onClose} size={"small"}
                                Text={isAdd ? `Добавление нового рабочего пространства` : "Редактирование рабочего пространства"}/>
                <div className={"addEditPlace-preview-settings-container"}>
                    <div className={"addEditPlace-preview-container"}>
                        <div className={"addEditPlace-name"}>
                            <div>
                                Тип: {place.element.type}
                            </div>
                            <div className={"addEditPlace-number"}>
                                №<Input type={"number"} inputSize={"small"} value={place.number_place}
                                        onChange={(e) => setPlace({...place, number_place: Number(e.target.value)})}/>
                            </div>

                        </div>
                        <div className={"addEditPlace-preview"}>
                            <svg viewBox={`0 0 ${place.element.width} ${place.element.height}`}
                                 style={place.element.width && place.element.height && place.element.width >= place.element.height ? {width: "100%"} : {height: "100%"}}>
                                {!place.element.only_indicator &&
                                    <image href={place.element.image} x={0} y={0} width={place.element.width}/>
                                }
                                <circle className={"circle"}
                                        cx={place.element.indicator_x}
                                        cy={place.element.indicator_y}
                                        r={place.element.indicator_size} fill={"red"}
                                        stroke="#000000" strokeWidth="0"/>
                            </svg>
                        </div>
                        <div className={"addEditPlace-preview-position"}>
                            <div>
                                x
                                <Input type={"number"} inputSize={"small"} value={place.x}
                                       onChange={(e) => setPlace({...place, x: Number(e.target.value)})}/>
                            </div>
                            <div>
                                y
                                <Input type={"number"} inputSize={"small"} value={place.y}
                                       onChange={(e) => setPlace({...place, y: Number(e.target.value)})}/>
                            </div>
                        </div>
                    </div>
                    <div className={"addEditPlace-settings-container"}>

                        <div className={"addEditPlace-settings"}>
                            <div className={"addEditPlace-warning"}>
                                {is_now_bron ? <div>Это место сейчас забронировано</div> :
                                    is_any_bron && <div>На это место есть бронирования</div>
                                }
                            </div>
                            <ConfigProvider
                                theme={{
                                    token: {

                                        fontFamily: "Montserrat",
                                        colorPrimary: '#AA0A22',
                                        colorPrimaryActive: "#AA0A22",
                                        borderRadius: 10,
                                        colorBgContainer: '#FFFFFF',
                                    },
                                }}
                            >
                                {optionsList&&optionsList}
                                <div>
                                    Можно забронировать
                                    <Switch value={place.can_bron}
                                            onChange={(e) => setPlace({...place, can_bron: e})}/>
                                </div>
                                <div>
                                    Видимый
                                    <Switch value={place.visible}
                                            onChange={(e) => setPlace({...place, visible: e})}/>
                                </div>
                                <div>
                                    Цена
                                    <Input type={"number"} inputSize={"small"} value={place.price}
                                           onChange={(val) => setPlace({...place, price: Number(val.target.value)})}/>
                                </div>


                            </ConfigProvider>
                        </div>
                        <div className={"addEditPlace-buttons"}>
                            {!isAdd &&
                                <Button onClick={onDelete} size={"small"} type={"delete"} styleProps={"white1"}/>
                            }
                            <Button onClick={onClose} styleProps={"white1"} size={"small"}>
                                Отменить
                            </Button>
                            <Button onClick={onSave} styleProps={"red"} size={"small"}>
                                {isAdd ? "Добавить" : "Сохранить"}
                            </Button>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    )
        ;
};

export default AddEditPlace;