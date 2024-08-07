import React, {useContext, useEffect, useRef, useState} from 'react';
import "./Login.css"
import Input from "../../UI/Input/Input";
import NavigateHeader from "../../UI/NavigateHeader/NavigateHeader";
import {Context} from "../../../index";
import {useLocation, useNavigate} from "react-router-dom";
import LoggedIn from "../../ProtectedPages/LoggedIn/LoggedIn";
import Button from "../../UI/Button/Button";
import {observer} from "mobx-react-lite";


const Login = () => {
    const {store} = useContext(Context)

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [canEnter, setCanEnter] = useState(false)

    const [errorLogin, setErrorLogin] = useState<[string]>()
    const [errorPassword, setErrorPassword] = useState<[string]>()

    useEffect(() => {
        if (login && password)
            setCanEnter(true)
        else
            setCanEnter(false)
    }, [login, password])

    // const changeCanEnter = () => {
    //     console.log(123)
    //     if (login && password)
    //         setCanEnter(true)
    //     else
    //         setCanEnter(false)
    // }



    const Login = () => {
        let data = {
            email: login,
            password: password,
            rememberMe: rememberMe
        }
        store.login(data)
            .then(r => {
                if (r.status === 200) {
                    navigate(from, {replace: true});
                }
            })
            .catch((e) => {
                switch (e.response?.data?.status) {
                    case("Error_1"):
                        setErrorLogin(["Пользователя с такой почтой не существует"])
                        setCanEnter(false)
                        break
                    case("Error_2"):
                        setErrorPassword(["Неверный пароль"])
                        setCanEnter(false)
                        break
                    default:
                        console.log("Что-то пошло не так")
                }
            })
    }

    return (
        <>
            {store.isAuth? <LoggedIn/> :
                <div className={"login-content"}>
                    <NavigateHeader/>
                    <form className={"login-form"} autoComplete={"off"}>
                        <div className={"login-text"}>Вход</div>

                        <div className={"login-input-container"}>
                            <div className={"login-input-hint"}>Электронная почта</div>
                            <Input
                                value={login}
                                inputSize={"medium"} type={"text"}
                                onChange={(e) => {
                                    setLogin(e.target.value)
                                    setErrorLogin(undefined)
                                }}
                                errorMsg={errorLogin}
                            />
                        </div>

                        <div className={"login-input-container"}>
                            <div className={"login-input-hint"}>Пароль</div>
                            <Input
                                value={password}
                                inputSize={"medium"} type={"password"} icon={true}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setErrorPassword(undefined)
                                }}
                                errorMsg={errorPassword}
                            />
                        </div>

                        <div className={"login-rememberMe"}>
                            <input type={"checkbox"} onChange={(e) => setRememberMe(e.target.checked)}/>
                            <div>Запомнить меня</div>
                        </div>


                        <Button type={"black"}
                                data-canEnter={canEnter}
                                onClick={Login}
                                disabled={!canEnter}
                        >
                            Войти
                        </Button>
                        <Button type={"white2"} onClick={() => navigate("/registration")}>Зарегистрироваться</Button>

                        <div className={"login-forgotPass"}>Забыли пароль?</div>
                    </form>
                </div>
            }</>
    );
};

export default observer(Login);