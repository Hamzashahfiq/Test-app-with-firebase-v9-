import { Navigate, Outlet } from "react-router-dom";



const PublicRoute = ({
    isLoginUser,
    redirectPath ='/home',
    children
}) => {
    if (isLoginUser) {
        return <Navigate to= {redirectPath} replace/>;
    }
//   return  children
    return children ? children : <Outlet />;
}


export default PublicRoute;
