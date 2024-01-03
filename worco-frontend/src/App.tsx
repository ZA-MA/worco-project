import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import InteractiveMap from "./components/map/InteractiveMap";
import Test from "./components/Test/Test";
import RequireAuth from "./components/Auth/RequireAuth";
import Main from "./components/PublicPages/Main/Main";
import {SpaRoutes} from "./Routes/spaRoutes";
import Home from "./components/Home/Home";
import Login from "./components/PublicPages/Login/Login";


const ROLES = {
    'Guest': 'Guest',
    'User': 'User',
    'Company': 'Company',
    'Admin': 'Admin'
}

function App() {
    return (
        <div className="App-div">
            <Routes>
                <Route path={SpaRoutes.Home} element={<Home/>}/>
                <Route path={SpaRoutes.LOGIN} element={<Login/>}/>
                <Route path={SpaRoutes.MAIN} element={<Main/>}/>
                {/*<Route element={<RequireAuth allowedRole={[ROLES.Guest]}/>}>

                    <Route path={SpaRoutes.MAIN} element={<Main/>}/>
                </Route>*/}
                {/*<Route path={SpaRoutes.REGISTRATION} element={<Main/>}/>*/}
                <Route element={<RequireAuth allowedRole={[ROLES.User]}/>}>
                    <Route path={SpaRoutes.Home} element={<Home/>}/>
                    <Route path={SpaRoutes.MAIN} element={<Main/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
