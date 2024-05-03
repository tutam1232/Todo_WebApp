import { useLocation, Navigate, Outlet, Form } from "react-router-dom";

const PrivateRoute = () => {
    const accessToken = localStorage.getItem('accessToken');
    const location = useLocation();

    return(
        accessToken ? 
        <Outlet /> : 
        <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default PrivateRoute;