import React from 'react';
import {TOKEN_ACCESS} from "../api/host";
import {Navigate, Outlet} from "react-router-dom";

function PrivateRouter() {
    const token = localStorage.getItem(TOKEN_ACCESS)
    return (
        <div>
            {token ?
                <Outlet/> :
                <Navigate to="/login" />
            }
        </div>
    );
}

export default PrivateRouter;
