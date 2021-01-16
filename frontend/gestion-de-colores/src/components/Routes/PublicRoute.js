//https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from './../../auth-context.js';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const usuarioContext = useContext(AuthContext);

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            usuarioContext.loggedIn === true && restricted ?
                <Redirect to="/colores" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;