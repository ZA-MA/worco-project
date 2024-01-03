import React, {useContext} from 'react';
import {Context} from "../../../index";

const Main = () => {
    const {store} = useContext(Context)

    return (
        <div>
            <div>Main page</div>
            <div>{store.role}</div>
            <button>Ne Login</button>
        </div>
    );
};

export default Main;