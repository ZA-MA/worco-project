import React, {useContext, useEffect, useRef, useState} from 'react';
import "../../PublicPages/Login/Login.css";
import Input from "../../UI/Input/Input";
import {Context} from "../../../index";
import {useLocation, useNavigate} from "react-router-dom";
import LoggedIn from "../../ProtectedPages/LoggedIn/LoggedIn";
import Button from "../../UI/Button/Button";
import DropDown, {IDropdownOption} from '../../UI/DropDown/DropDown';
import {observer} from "mobx-react-lite";
import NewHeader from "../../UI/NewHeader/NewHeader";

interface ICompanyReg {
    email:{value:string, error: [string]|undefined},
    phone:{value:string, error: [string]|undefined},
    nameCompany:{value:string, error: [string]|undefined},
    typeCompany:{value:string, error: [string]|undefined},
    inn:{value:string, error: [string]|undefined},
    password:{value:string, error: [string]|undefined},
}

const CompanyRegistration = ( ) => {
    const {store} = useContext(Context)

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [fieldsData, setFieldsData] = useState<ICompanyReg>({
        email:{value:"", error: undefined},
        phone:{value:"", error: undefined},
        nameCompany:{value:"", error: undefined},
        typeCompany:{value:"", error: undefined},
        inn:{value:"", error: undefined},
        password:{value:"", error: undefined},
    })
    const [doublePassword, setDoublePassword] = useState("");

    const [agree, setAgree] = useState(false);
    const [canEnter, setCanEnter] = useState(false);
    const [success, setSuccess] = useState(false);

    const [errorDoublePassword, setErrorDoublePassword] = useState<[string]>();

    const companyTypes:IDropdownOption[] = [
        {name: 'ООО'},
        {name: 'ОАО'},
        {name: 'ИП'}
    ];


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
            Email: fieldsData.email,
            Phone: fieldsData.phone,
            CompanyName: fieldsData.nameCompany,
            Inn: fieldsData.inn,
            TypeOfOrganization: fieldsData.typeCompany,
            Password: fieldsData.password
        }
        store.RegisterCompany(data)
            .then(r => {
                if (r.status === 200) {
                    navigate(from, {replace: true});
                }
            })
            .catch((e) => {

                if (e.response?.data?.errors){

                    setCanEnter(false);

                    if(e.response.data.errors.Email){
                        ChangeFieldValues("email", e.target.value, e.response.data.errors.Email)
                    }
                    if(e.response.data.errors.Phone){
                        ChangeFieldValues("phone", e.target.value, e.response.data.errors.Phone)
                    }
                    if(e.response.data.errors.CompanyName){
                        ChangeFieldValues("nameCompany", e.target.value, e.response.data.errors.CompanyName)
                    }
                    if(e.response.data.errors.TypeOfOrganization){
                        ChangeFieldValues("typeCompany", e.target.value, e.response.data.errors.TypeOfOrganization)
                    }
                    if(e.response.data.errors.Inn){
                        ChangeFieldValues("inn", e.target.value, e.response.data.errors.Inn)
                    }
                    if(e.response.data.errors.Password){
                        ChangeFieldValues("password", e.target.value, e.response.data.errors.Password)
                    }

                }

                switch (e.response?.data?.status) {
                    case("Error_1"):
                        setCanEnter(false)
                        ChangeFieldValues("email", e.target.value, "Данная почта уже используется!")
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

    const ChangeTypeField = (item:IDropdownOption) => {
        setFieldsData((prevInputValues) => ({
            ...prevInputValues,
            ["typeCompany"]: { value: item.name, error: undefined },
        }));
    }

    return (
        <>
            <NewHeader size={"medium"}/>
            <div className={"login-content"} style={{height:"unset", margin:"5% auto"}}>
                <form className={"login-form"} autoComplete={"off"}>
                    <div className={"login-text"}>Регистрация</div>

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
                        <div className={"login-input-hint"}>Название организации</div>
                        <Input
                            value={fieldsData.nameCompany.value}
                            inputSize={"medium"} type={"text"}
                            onChange={(e) => {
                                ChangeFieldValues("nameCompany", e.target.value, undefined)
                            }}
                            errorMsg={fieldsData.nameCompany.error}
                        />
                    </div>

                    <div className={"login-input-container"}>
                        <div className={"login-input-hint"}>Номер ИНН</div>
                        <Input
                            value={fieldsData.inn.value}
                            inputSize={"medium"} type={"number"}
                            onChange={(e) => {
                                ChangeFieldValues("inn", e.target.value, undefined)
                            }}
                            errorMsg={fieldsData.inn.error}
                        />
                    </div>

                    <div className={"login-input-container"}>
                        <div className={"login-input-hint"}>Тип организации</div>
                        <DropDown
                            options={companyTypes}
                            onChange={ChangeTypeField}
                            icon={true}
                            value={fieldsData.typeCompany.value}
                            errorMsg={fieldsData.typeCompany.error}
                            placeHolder={""}
                            size={"medium"}
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
        </>
    );
};

export default observer(CompanyRegistration);