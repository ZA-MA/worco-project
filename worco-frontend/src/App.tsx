import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Map from "./components/Map/Map";
import Test from "./components/Test/Test";
import RequireAuth from "./components/Auth/RequireAuth";
import Main from "./components/PublicPages/Main/Main";
import {SpaRoutes} from "./Routes/spaRoutes";
import Home from "./components/Home/Home";
import Login from "./components/PublicPages/Login/Login";
import LoggedIn from "./components/ProtectedPages/LoggedIn/LoggedIn";
import {observer} from "mobx-react-lite";


const ROLES = {
    'Guest': 'Guest',
    'User': 'User',
    'Company': 'Company',
    'Admin': 'Admin'
}

function App() {
    return (
        <>
            <Routes>

                <Route path={SpaRoutes.Home} element={<Home/>}/>
                <Route path={SpaRoutes.LOGIN} element={<Login/>}/>

                {/*<Route element={<RequireAuth allowedRole={[ROLES.Guest]}/>}>

                    <Route path={SpaRoutes.MAIN} element={<Main/>}/>
                </Route>*/}
                {/*<Route path={SpaRoutes.REGISTRATION} element={<Main/>}/>*/}
                <Route element={<RequireAuth allowedRole={[ROLES.User]}/>}>
                    <Route path={SpaRoutes.Home} element={<Home/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default observer(App);
