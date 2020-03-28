import React from  "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import NonPrivateRoute from "./Routes/NonPrivateRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import MyBooks from "./components/MyBooks";
import AddBook from "./components/AddBook";


const Routes = ({ childProps }) => {
    return (
        <Switch>
            <NonPrivateRoute exact path="/login" component={Login} props={childProps}></NonPrivateRoute>
            
            <PrivateRoute exact path="/" component={Home} props={childProps}></PrivateRoute>
            <PrivateRoute exact path="/mybooks" component={MyBooks} props={childProps}></PrivateRoute>
            <PrivateRoute exact path="/addbook" component={AddBook} props={childProps}></PrivateRoute>
        </Switch>
    );
}


export default Routes;