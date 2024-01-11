import React, {useState} from 'react';
import "./CustomInput.css"
import InputMask from "react-input-mask";

interface ICustomInput {
    type?: string
    name?: string,
    value?: any,
    placeHolder?: string,
    onChange?: (val: any) => any,
    icon?: boolean,
    error?: boolean,
    errorMsg?: [string],
    mask?: string,
    styleInputField?: string,
    disabled?: boolean,
    required?: boolean,
    inputSize?: "large" | "small",
    min?: string,
    max?: string,
    step?: string,
    numberButtons?: boolean,
    ref?: any
}

function CustomInput(
    {
        type = "text", name, value, placeHolder,
        onChange, icon, error, errorMsg, mask = "",
        styleInputField = "", disabled=false,
        required=false, inputSize, min, max, step, numberButtons = true, ref
    }: ICustomInput) {
    const [isRevealPwd, setIsRevealPwd] = useState(false);


    //icon ? errorMsg ? "75px" : "44px" : "21px"
    return (
        <>
            {type === "text" &&
                <div className={"custom-input"}>
                    <input
                        ref={ref}
                        required={required}
                        style={{paddingRight: icon && errorMsg? "80px" : icon || errorMsg? "50px" : "21px", borderColor: errorMsg ? "#db2020" : ""}}
                        className={"custom-input-field " + styleInputField}
                        type={"text"}
                        name={name}
                        value={value}
                        placeholder={placeHolder}
                        onChange={onChange}
                        disabled={disabled}
                        data-size={inputSize}
                    />
                    {errorMsg &&
                        <div className={"сustom-input-error"} style={{right: icon? "50px" : "21px"}}>
                            <img
                                className={"сustom-input-error-image"}
                                src={"/Pictures/errorIcon.svg"}
                            />
                            <div className={"сustom-input-error-text"}>
                                {errorMsg.map((e: any) => <div>{e}</div>)}
                            </div>
                        </div>
                    }
                    {icon &&
                        <img className={"custom-input-image"}
                             src={"/Pictures/InputIcon.svg"}
                        />
                    }
                </div>
            }
            {type === "number" &&
                <div className={"custom-input"} style={{borderColor: error ? "#db2020" : ""}}>
                    <input
                        style={{paddingRight: icon && errorMsg? "80px" : icon || errorMsg? "50px" : "21px", borderColor: errorMsg ? "#db2020" : ""}}
                        className={"custom-input-field"}
                        data-numberButtons={numberButtons}
                        type={"number"}
                        name={name}

                        value={value}
                        placeholder={placeHolder}
                        onChange={onChange}
                        disabled={disabled}
                        data-size={inputSize}
                        min={min}
                        max={max}
                        step={step}
                    />
                    {errorMsg &&
                        <div className={"сustom-input-error"} style={{right: icon? "50px" : "21px"}}>
                            <img
                                className={"сustom-input-error-image"}
                                src={"/Pictures/errorIcon.svg"}
                            />
                            <div className={"сustom-input-error-text"}>
                                {errorMsg.map((e: any) => <div>{e}</div>)}
                            </div>
                        </div>
                    }
                    {icon &&
                        <img className={"custom-input-image"}
                             src={"/Pictures/InputIcon.svg"}
                        />
                    }
                </div>
            }
            {type === "telephone" &&
                <div className={"custom-input"} style={{borderColor: error ? "#db2020" : ""}}>
                    <InputMask
                        style={{paddingRight: icon && errorMsg? "80px" : icon || errorMsg? "50px" : "21px", borderColor: errorMsg ? "#db2020" : ""}}
                        className={"custom-input-field"}
                        mask="+7 (999) 999-99-99" //+7 (999) 999-99-99
                        name={name}
                        value={value}
                        placeholder={placeHolder}
                        onChange={onChange}
                        disabled={disabled}
                        data-size={inputSize}
                    />
                    {errorMsg &&
                        <div className={"сustom-input-error"} style={{right: icon? "50px" : "21px"}}>
                            <img
                                className={"сustom-input-error-image"}
                                src={"/Pictures/errorIcon.svg"}
                            />
                            <div className={"сustom-input-error-text"}>
                                {errorMsg.map((e: any) => <div>{e}</div>)}
                            </div>
                        </div>
                    }
                    {icon &&
                        <img className={"custom-input-image"}
                             src={"/Pictures/InputIcon.svg"}
                        />
                    }
                </div>
            }
            {type === "inputMask" &&
                <div className={"custom-input"} style={{borderColor: error ? "#db2020" : ""}}>
                    <InputMask
                        style={{paddingRight: icon && errorMsg? "80px" : icon || errorMsg? "50px" : "21px", borderColor: errorMsg ? "#db2020" : ""}}
                        className={"custom-input-field"}
                        mask={mask}
                        name={name}
                        value={value}
                        placeholder={placeHolder}
                        onChange={onChange}
                        disabled={disabled}
                        data-size={inputSize}
                    />
                    {errorMsg &&
                        <div className={"сustom-input-error"} style={{right: icon? "50px" : "21px"}}>
                            <img
                                className={"сustom-input-error-image"}
                                src={"/Pictures/errorIcon.svg"}
                            />
                            <div className={"сustom-input-error-text"}>
                                {errorMsg.map((e: any) => <div>{e}</div>)}
                            </div>
                        </div>
                    }
                    {icon &&
                        <img className={"custom-input-image"}
                             src={"/Pictures/InputIcon.svg"}
                        />
                    }
                </div>
            }
            {
                type === "password" &&
                <div className={"custom-input password"} style={{borderColor: error ? "#db2020" : ""}}>
                    <input
                        style={{paddingRight: icon && errorMsg? "80px" : icon || errorMsg? "50px" : "21px", borderColor: errorMsg ? "#db2020" : ""}}
                        name={name}
                        className={"custom-input-field"}
                        type={isRevealPwd ? "text" : "password"}
                        onChange={onChange}
                        value={value}
                        placeholder={placeHolder}
                        disabled={disabled}
                        data-size={inputSize}
                    />
                    {errorMsg &&
                        <div className={"сustom-input-error"} style={{right: icon? "50px" : "21px"}}>
                            <img
                                className={"сustom-input-error-image"}
                                src={"/Pictures/errorIcon.svg"}
                            />
                            <div className={"сustom-input-error-text"}>
                                {errorMsg.map((e: any) => <div>{e}</div>)}
                            </div>
                        </div>
                    }
                    {icon &&
                        <img
                            className={"custom-input-image"}
                            src={isRevealPwd ? "/Pictures/closeEye.svg" : "/Pictures/openEye.svg"}
                            onClick={() => setIsRevealPwd(prevState => !prevState)}
                        />
                    }
                </div>
            }
        </>
    )

};

export default CustomInput;