import React, {useContext, useEffect, useRef, useState} from 'react';
import "../../PublicPages/Login/Login.css";
import Input from "../../UI/Input/Input";
import {Context} from "../../../index";
import {useLocation, useNavigate} from "react-router-dom";
import LoggedIn from "../../ProtectedPages/LoggedIn/LoggedIn";
import Button from "../../UI/Button/Button";
import DropDown, {IDropdownOption} from '../../UI/DropDown/DropDown';
import {observer} from "mobx-react-lite";

interface IUserReg {
    name:{value:string, error: [string]|undefined},
    email:{value:string, error: [string]|undefined},
    phone:{value:string, error: [string]|undefined},
    password:{value:string, error: [string]|undefined},
}

const UserRegistration = ( ) => {
    const {store} = useContext(Context)

    const navigate = useNavigate();
    const location = useLocation();

    const [fieldsData, setFieldsData] = useState<IUserReg>({
        name:{value:"", error: undefined},
        email:{value:"", error: undefined},
        phone:{value:"", error: undefined},
        password:{value:"", error: undefined},
    })
    const [doublePassword, setDoublePassword] = useState("");

    const [agree, setAgree] = useState(false);
    const [canEnter, setCanEnter] = useState(false);
    const [success, setSuccess] = useState(false);

    const [errorDoublePassword, setErrorDoublePassword] = useState<[string]>();

    useEffect(() => {
        if (Object.values(fieldsData).every(field => field.value !== "") && doublePassword && agree){
            if (doublePassword === fieldsData.password.value){
                setCanEnter(true);
            }
            else{
                setErrorDoublePassword(['Пароли не совпадают!'])
                setCanEnter(false);
            }
        }
        else{
            setCanEnter(false);
        }
    }, [fieldsData, doublePassword, agree])


    const Registration = () => {
        let data = {

        }
        store.login(data)
            .then(r => {

            })
            .catch((e) => {
                switch (e.response?.data?.status) {
                    case("Error_1"):
                        setCanEnter(false)
                        break
                    case("Error_2"):
                        setCanEnter(false)
                        break
                    default:
                        console.log("Что-то пошло не так")
                }
            })
    }

    const ChangeFieldValues = (fieldName:string, value:string, error:string|undefined) => {
        setFieldsData((prevInputValues) => ({
            ...prevInputValues,
            [fieldName]: { value, error: error },
        }));
    }

    return (
        <>
            {success ?
                <div>
                    Вы успешно зарегистрировались
                </div>
                :
                <div className={"login-content"}>
                    <form className={"login-form"} autoComplete={"off"}>
                        <div className={"login-text"}>Вход</div>

                        <div className={"login-input-container"}>
                            <div className={"login-input-hint"}>ФИО</div>
                            <Input
                                value={fieldsData.name.value}
                                inputSize={"medium"} type={"text"} placeHolder={"Фамилия Имя Отчество"}
                                onChange={(e) => {
                                    ChangeFieldValues("name", e.target.value, undefined)
                                }}
                                errorMsg={fieldsData.name.error}
                            />
                        </div>

                        <div className={"login-input-container"}>
                            <div className={"login-input-hint"}>Электронная почта</div>
                            <Input
                                value={fieldsData.email.value}
                                inputSize={"medium"} type={"text"}
                                onChange={(e) => {
                                    ChangeFieldValues("email", e.target.value, undefined)
                                }}
                                errorMsg={fieldsData.email.error}
                            />
                        </div>

                        <div className={"login-input-container"}>
                            <div className={"login-input-hint"}>Номер телефона</div>
                            <Input
                                value={fieldsData.phone.value}
                                inputSize={"medium"} type={"telephone"}
                                onChange={(e) => {
                                    ChangeFieldValues("phone", e.target.value, undefined)
                                }}
                                errorMsg={fieldsData.phone.error}
                            />
                        </div>

                        <div className={"login-input-container"}>
                            <div className={"login-input-hint"}>Пароль</div>
                            <Input
                                value={fieldsData.password.value}
                                inputSize={"medium"} type={"password"} icon={true}
                                onChange={(e) => {
                                    ChangeFieldValues("password", e.target.value, undefined)
                                }}
                                errorMsg={fieldsData.password.error}
                            />
                        </div>

                        <div className={"login-input-container"}>
                            <div className={"login-input-hint"}>Подтвердите пароль</div>
                            <Input
                                value={doublePassword}
                                inputSize={"medium"} type={"password"} icon={true}
                                onChange={(e) => {
                                    setDoublePassword(e.target.value)
                                    setErrorDoublePassword(undefined)
                                }}
                                errorMsg={errorDoublePassword}
                            />
                        </div>

                        <div className={"login-rememberMe"}>
                            <input type={"checkbox"} onChange={(e) => setAgree(e.target.checked)}/>
                            <div>Согласие на обработку персональных данных</div>
                        </div>


                        <Button styleProps={"red"}
                                data-canEnter={canEnter}
                                onClick={Registration}
                                disabled={!canEnter}
                        >
                            Зарегистрироваться
                        </Button>

                    </form>
                </div>
            }</>
    );
};

export default observer(UserRegistration);