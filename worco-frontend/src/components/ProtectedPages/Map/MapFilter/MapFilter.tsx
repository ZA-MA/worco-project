import React, {useContext, useRef, useState} from 'react';
import "./MapFilter.css"
import {Context} from "../../../../index";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import {Calendar, ConfigProvider, DatePicker, theme} from 'antd';
import locale from "antd/es/date-picker/locale/ru_RU";
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import Button from "../../../UI/Button/Button";

const MapFilter = () => {
    const {store} = useContext(Context)

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<[]>([])
    const ref = useRef(null)

    const handlerFilter = () => {
        setTimeout(() => setIsOpen(!isOpen), 450)
    }

    // useOnClickOutside(ref, () => {
    //     if(isOpen) handlerFilter()
    // });

    function disabledDate(current: any) {
        return current.isBefore(dayjs().add(-1, 'day')) || currentMonth !== current.month()
    }

    const [currentMonth, setCurrentMonth] = useState(dayjs().month())
    const headerRender = ({value, type, onChange, onTypeChange}: any) => {

        const handleClickPreviousMonth = () => {
            onChange(value.clone().subtract(1, 'month'));
            setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)
        };

        const handleClickNextMonth = () => {
            onChange(value.clone().add(1, 'month'));
            setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)
        }

        return (
            <div className={"calendar-header"}>
                <button onClick={handleClickPreviousMonth}>{'<'}</button>
                <span>{value.locale("ru").format('MMMM YYYY')}</span>
                <button onClick={handleClickNextMonth}>{'>'}</button>
            </div>
        )
    }


    const onValueChange = (date: dayjs.Dayjs) => {
        let newDate = date.format("YYYY-MM-DD")

        // @ts-ignore
        if (selectedDate.includes(newDate)) {
            // @ts-ignore
            setSelectedDate([...selectedDate?.filter((d) => d !== newDate)])
        } else {
            // @ts-ignore
            setSelectedDate([...selectedDate, newDate])
        }
    };

    const onValueChangeDisable = () => {

    }

    const dateRender = (currentDate: any, info: any) => {

        let date = currentDate.format("YYYY-MM-DD")

        if (currentDate.month() === currentMonth) {
            // @ts-ignore
            if (selectedDate.includes(date)) {

                return <div className="date select-date" onClick={() => onValueChange(currentDate)}>
                    <div>{currentDate.date()}</div>
                </div>
            } else {
                return <div className="date" onClick={() => onValueChange(currentDate)}>
                    <div>{currentDate.date()}</div>
                </div>
            }
        } else {
            return <div className={"disable-date"}></div>
        }
    }

    return (
        <>
            <div className={"interactiveMap-panel-filter"}>
                <Button onClick={() => setIsOpen(!isOpen)} styleProps={"white1"} size={"small"}
                        selected={isOpen}>Фильтр</Button>
            </div>
            <div className={"interactiveMap-filter-content"} ref={ref} data-show={isOpen}>
                <div className={"interactiveMap-filter-type"}>

                </div>
                <ConfigProvider
                    theme={{
                        token: {

                            fontFamily: "Montserrat",
                            colorPrimary: '#AA0A22',
                            colorPrimaryActive: "#8F0E21",
                            borderRadius: 0,
                            colorBgContainer: '#FFFFFF',
                            colorTextDisabled: "#AA0A22"
                        },
                    }}
                >
                    <Calendar
                        headerRender={(e) => headerRender(e)}
                        className={"interactiveMap-filter-calendar"}
                        locale={locale}
                        mode={"month"}
                        fullscreen={false}
                        disabledDate={(current) => disabledDate(current)}
                        fullCellRender={(e, info) => dateRender(e, info)}

                    />
                </ConfigProvider>
                <div className={"interactiveMap-filter-time"}>
                    Время
                </div>
                <div className={"interactiveMap-filter-additionally"}>
                    Дополнительно
                </div>
            </div>
        </>
    );
};

export default MapFilter;