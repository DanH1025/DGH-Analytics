import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { useCookies } from 'react-cookie';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const [cookie, setCookie] = useCookies(['user']);
    console.log(allowedRoles);
    return (
        cookie?.ADrole === allowedRoles
        ? <Outlet />
        : cookie?.ADemail 
            ? <Navigate to="/" state={{ from: location }} replace />
            :<Navigate to="/adminstrationLogin" state={{ from: location }} replace />
    );
}

export default RequireAuth;