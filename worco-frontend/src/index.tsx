import './index.css';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {ModalState} from "./context/ModalContext";
import ReactDOM from 'react-dom';
import React, {createContext} from 'react';
import Store from './store/store'

import Layout from "./components/Layout/Layout";



interface IStore {
    store:Store;
}

const store = new Store();

export const Context = createContext<IStore>({
    store,
})

ReactDOM.render(
    // <HashRouter>
    <HashRouter>
        <ModalState>
                <div className={"content"}>
                    <Layout/>
                </div>
                {/*<Footer/>*/}
        </ModalState>
    </HashRouter>
    ,
    document.getElementById('root')
);



