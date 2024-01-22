import React, {useContext} from 'react';
import {Context} from "../../../index";
import ContextProviderContainer from "../../../ContextProviderContainer";

const CompanyLayout = () => {
    const {store} = useContext(Context)
    return (
        <div className={"company-content"}>
            <Context.Provider value={{store}}>
                <ContextProviderContainer/>
            </Context.Provider>
        </div>
    );
};

export default CompanyLayout;