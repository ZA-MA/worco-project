import React, {useRef, useState} from 'react';
import "./DropDown.css"
import useOnClickOutside from "../../../hooks/useOnClickOutside";
export interface IDropdownOption{
    key?: string | number;
    name:string;
    visible?: boolean;
    notBlocked?: boolean;
}

interface IDropDown{
    options: IDropdownOption[]
    value?: string,
    onChange: (val:any)=>any,
    name?: string,
    placeHolder: string,
    size: "large" | "medium" | "small",
    errorMsg?: [string],
    icon?: boolean,
    disabled?: boolean
}

const DropDown = ({options, value, onChange, name, placeHolder, size, errorMsg, icon=true, disabled=false}:IDropDown) => {

    const [show, setShow] = useState(false)
    const refDropDown = useRef(null)
    const dropDownHandler = (item:any) => {
        setShow(false)
        onChange(item)
    }

    const ListDropdown = options.map((item, index) => {
        return (
            <div
                className={"dropdown-item"}
                onClick={() => dropDownHandler(item.name)}
                key={index}
            >
                <div>{item.name}</div>
            </div>
        )
    })

    useOnClickOutside(refDropDown, () => setShow(false))

    return (
        <div className={"dropDown"} ref={refDropDown}>
            <div className={"dropDown-content"} onClick={() => !disabled? setShow(!show) : undefined} data-size={size}>
                <div className={"dropDown-value"} data-value={value&&true}>
                    {value? value : placeHolder}
                </div>
                {icon &&
                    <img className={"dropDown-image"}
                         data-show={show}
                         src={"/Pictures/dropDownIcon.svg"}
                    />
                }
            </div>
            <div className={"dropDown-list"} data-show={show} data-size={size}>
                <div className={"dropDown-list-content"}>{ListDropdown}</div>
            </div>
        </div>
    );
};

export default DropDown;