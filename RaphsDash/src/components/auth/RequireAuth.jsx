import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const location = useLocation();

    return (
        localStorage.getItem('userId')
        // represents any child component of require auth - only shown if have user
        ? <Outlet />
        // replace login in their nav history with location that they came from
        : <Navigate to="/login" state={{from: location}} replace/>
    );
}

export default RequireAuth;