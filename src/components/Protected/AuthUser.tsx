import React from "react";
import { Navigate, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ReactElement<RouteProps>;
}
//<Navigate to="/login" />

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const auth = true;

    if (!auth) {
        return <Navigate to="/login" />;
        // Redirect to login if not authenticated
        //return <div>Login Now</div>;
    }

    // Render the component if authenticated
    return element;
};

export default PrivateRoute;
