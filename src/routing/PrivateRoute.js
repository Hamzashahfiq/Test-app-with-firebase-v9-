import { Navigate, Outlet } from "react-router-dom";

import React, { Children } from 'react'

const PrivateRoute = ({
    isLoginUser,
    isLogout,
    redirectPath =  "/login",
    children
}) => {
    if (!isLoginUser) {
        return <Navigate to= {isLogout?"/Logout":redirectPath} replace/>;
    }
//   return  children
    return children ? children : <Outlet />;
}


export default PrivateRoute;
