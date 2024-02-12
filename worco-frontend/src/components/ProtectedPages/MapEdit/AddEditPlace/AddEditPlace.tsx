import React from 'react';
import "./AddEditPlace.css"
import {IPlace} from "../../../../models/models";
import NavigateHeader from "../../../UI/NavigateHeader/NavigateHeader";
import Input from "../../../UI/Input/Input";
import {ConfigProvider, Switch} from "antd";

interface IAddEditPlace{
    place: IPlace,
    isAdd: boolean
    onClose: () => void
}
const AddEditPlace = ({place, isAdd, onClose}:IAddEditPlace) => {
    return (
        <div className={"addEditPlace"}>
            <div className={"addEditPlace-content"}>
            <NavigateHeader Text={isAdd? "Добавление" : "Редактирование"} size={"small"} onClick={onClose}/>
            <div className={"addEditPlace-editable"}>
                <div className={"addEditPlace-namePlace"}>
                    {place.name} №<Input type={"number"} inputSize={"small"} errorMsg={["sad"]} max={"100"}/>
                </div>

                <div className={"addEditPlace-settings"}>
                    <div className={"addEditPlace-placeElem"} >
                        <svg viewBox={`0 0 ${place.width} ${place.height}`}>
                            <image href={place.image} x={0} y={0} width={place.width}/>
                            <circle className={"circle"} cx={place.width/2} cy={place.height/2} r="10" fill={"black"} stroke="#000000" strokeWidth="2"/>
                        </svg>
                    </div>
                    <div className={"addEditPlace-settings-va"}>
                        <div>
                            Можно забронировать
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
                                <Switch/>
                            </ConfigProvider>
                        </div>
                        <div>
                            Видимый
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
                                <Switch/>
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    );
};

export default AddEditPlace;