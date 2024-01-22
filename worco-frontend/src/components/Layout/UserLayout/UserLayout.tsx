import React, {useContext} from 'react';
import {Context} from "../../../index";
import ContextProviderContainer from "../../../ContextProviderContainer";
import Header from "../../Header/Header";

const UserLayout = () => {
    const {store} = useContext(Context)

    return (
        <div className={"user-content"}>
            <Context.Provider value={{store}}>
                <ContextProviderContainer/>
            </Context.Provider>
        </div>
    );
};

export default UserLayout;