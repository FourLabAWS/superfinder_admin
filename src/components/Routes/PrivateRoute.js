import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLogin } from '../../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Navigate to="/login" />
        )} />
    );
};

export default PrivateRoute;