import * as React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, props: cProps, ...rest}) => (
    <Route {...rest} render = {props => (
        (cProps.isAuthenticated === true)
            ? <Component {...props} {...cProps} />
            : <Redirect to={{pathname: "/login" }} />
    )}/>
);