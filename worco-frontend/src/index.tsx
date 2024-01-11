import './index.css';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {ModalState} from "./context/ModalContext";
import ReactDOM from 'react-dom';
import React, {createContext} from 'react';
import Store from './store/store'

import Layout from "./components/Layout/Layout";
import {disableScaling} from "./functions/disableScaling";



interface IStore {
    store:Store;
}

const store = new Store();

export const Context = createContext<IStore>({store})

disableScaling()

ReactDOM.render(
    <HashRouter>
        <Context.Provider value={{store}}>
            <Layout/>
        </Context.Provider>
    </HashRouter>
    ,
    document.body
);




