import React, {useContext} from 'react';
import {Context} from "../../../index";
import ContextProviderContainer from "../../../ContextProviderContainer";

const UserLayout = () => {
    const {store} = useContext(Context)

    return (
        <div>
            <Context.Provider value={{store}}>
                <ContextProviderContainer/>
            </Context.Provider>
        </div>
    );
};

export default UserLayout;