//https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from './../../auth-context.js';

const PrivateRoute = ({component: Component, ...rest}) => {
    const usuarioContext = useContext(AuthContext);

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            usuarioContext.loggedIn === true ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;