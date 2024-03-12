import React, {useContext, useEffect, useRef, useState} from 'react';
import "./MapFilter.css"
import {Context} from "../../../../index";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import {Calendar, ConfigProvider, DatePicker, theme} from 'antd';
import locale from "antd/es/date-picker/locale/ru_RU";
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import Button from "../../../UI/Button/Button";

interface IMapFilter{
    options?: string[],
    onSelect: (selectedTypes: any, selectedDate: any, selectedOptions: any) => void
}

const MapFilter = ({options, onSelect}:IMapFilter) => {
    const {store} = useContext(Context)

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<[]>([])
    const [selectedTypes, setSelectedTypes] = useState({
        place: true,
        meetingRoom: true,
        office: true,
    })
    const [selectedOptions, setSelectedOptions] = useState<{name: string, sel:boolean}[]>([])
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

    useEffect(() => {
        if(options)
            setSelectedOptions(options.map(o => {
                return {name: o, sel: false}
            }))
    }, [options])

    return (
        <>
            <div className={"interactiveMap-panel-filter"}>
                <Button onClick={() => setIsOpen(!isOpen)} styleProps={"white1"} size={"small"}
                        selected={isOpen}>Фильтр</Button>
            </div>
            <div className={"interactiveMap-filter-container"} ref={ref} data-show={isOpen}>
                <div className={"interactiveMap-filter-content"}>
                    <div className={"interactiveMap-filter-type"}>
                        Рабочее пространство
                        <Button onClick={() => setSelectedTypes({...selectedTypes, place: !selectedTypes.place})}
                                styleProps={"white1"}
                                selected={selectedTypes.place}
                        >
                            Место
                        </Button>
                        <Button onClick={() => setSelectedTypes({...selectedTypes, meetingRoom: !selectedTypes.meetingRoom})}
                                styleProps={"white1"}
                                selected={selectedTypes.meetingRoom}
                        >
                            Переговорная
                        </Button>
                        <Button onClick={() => setSelectedTypes({...selectedTypes, office: !selectedTypes.office})}
                                styleProps={"white1"}
                                selected={selectedTypes.office}
                        >
                            Офис
                        </Button>
                    </div>
                    Календарь
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
                    Дополнительно
                    <div className={"interactiveMap-filter-additionally"}>
                        <Button onClick={() => undefined} styleProps={"white1"} size={"small"}
                                selected={!selectedOptions?.some(o => o.sel)}
                        >--</Button>
                        {selectedOptions && selectedOptions.map((o, i) => (
                            <Button
                                onClick={() => {
                                    setSelectedOptions(prevOptions => {
                                        const updatedOptions = [...prevOptions];
                                        updatedOptions[i].sel = !updatedOptions[i].sel;
                                        return updatedOptions;
                                    });
                                }}
                                styleProps={"white1"}
                                size={"small"}
                                selected={o.sel}
                                key={i}
                            >
                                {o.name}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className={"interactiveMap-filter-select"}>
                    <Button onClick={() => onSelect(selectedTypes, selectedDate, selectedOptions)}>
                        Применить
                    </Button>
                </div>
            </div>
        </>
    );
};

export default MapFilter;