import React, {useContext} from 'react';
import {Context} from "../../../index";
import ContextProviderContainer from "../../../ContextProviderContainer";

const AdminLayout = () => {
    const {store} = useContext(Context)
    return (
        <div className={"admin-content"}>
            <Context.Provider value={{store}}>
                <ContextProviderContainer/>
            </Context.Provider>
        </div>
    );
};

export default AdminLayout;