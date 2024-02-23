import React, {useState} from 'react';
import "./AddEditPlace.css"
import {IPlace} from "../../../../models/models";
import NavigateHeader from "../../../UI/NavigateHeader/NavigateHeader";
import Input from "../../../UI/Input/Input";
import {ConfigProvider, Switch} from "antd";
import DropDown from "../../../UI/DropDown/DropDown";
import Draggable from "react-draggable";
import Button from "../../../UI/Button/Button";

interface IAddEditPlace {
    placeProps: IPlace,
    isAdd: boolean
    onClose: () => void
}

const AddEditPlace = ({placeProps, isAdd, onClose}: IAddEditPlace) => {
    const [place, setPlace] = useState(placeProps)

    const onSave = () => {

    }
    const onDelete = () => {

    }

    return (
        <div className={"addEditPlace"}>
            <div className={"addEditPlace-content"}>
                <NavigateHeader onClick={onClose} size={"small"}
                                Text={isAdd ? `Добавление нового ${place.element.type}` : "Редактирование элемента"}/>
                <div className={"addEditPlace-name"}> Тип: {place.element.type}</div>

                <div className={"addEditPlace-preview-settings-container"}>
                    <div className={"addEditPlace-preview-container"}>
                        <div className={"addEditPlace-preview"}>
                            <svg viewBox={`0 0 ${place.element.width} ${place.element.height}`}
                                 style={place.element.width && place.element.height && place.element.width >= place.element.height ? {width: "100%"} : {height: "100%"}}>
                                {!place.element.only_indicator &&
                                    <image href={place.element.image} x={0} y={0} width={place.element.width}/>
                                }
                                <circle className={"circle"}
                                        cx={place.element.indicator_x}
                                        cy={place.element.indicator_y}
                                        r={place.element.indicator_size} fill={"black"}
                                        stroke="#000000" strokeWidth="0"/>
                            </svg>
                        </div>
                        <div className={"addEditPlace-preview-position"}>
                            <div>x <Input type={"number"} inputSize={"small"}/></div>
                            <div>y <Input type={"number"} inputSize={"small"}/></div>
                        </div>
                    </div>
                    <div className={"addEditPlace-settings-container"}>
                        <div className={"addEditPlace-settings"}>
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
                                <div>
                                    Кондиционер
                                    <Switch value={place.opt_conditioner}
                                            onChange={(e) => setPlace({...place, opt_conditioner: e})}/>
                                </div>
                                <div>
                                    Доступ к принтеру
                                    <Switch value={place.opt_conditioner}
                                            onChange={(e) => setPlace({...place, opt_conditioner: e})}/>
                                </div>
                                <div>
                                    Доступ к сканнеру
                                    <Switch value={place.opt_conditioner}
                                            onChange={(e) => setPlace({...place, opt_conditioner: e})}/>
                                </div>
                                <div>
                                    Можно забронировать
                                    <Switch value={place.opt_conditioner}
                                            onChange={(e) => setPlace({...place, opt_conditioner: e})}/>
                                </div>
                                <div>
                                    Видимый
                                    <Switch value={place.opt_conditioner}
                                            onChange={(e) => setPlace({...place, opt_conditioner: e})}/>
                                </div>
                                <div>
                                    Цена
                                    <Input type={"number"} inputSize={"small"}/>
                                </div>


                            </ConfigProvider>
                        </div>
                        <div className={"addEditPlace-buttons"}>
                            <button className={"addEditElement-buttons-delete"} onClick={onDelete}>
                                <div></div>
                            </button>
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

    )
        ;
};

export default AddEditPlace;