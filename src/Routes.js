import React from  "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import NonPrivateRoute from "./Routes/NonPrivateRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import MyBooks from "./containers/MyBooks";
import AddBook from "./containers/AddBook";
import SearchResult from "./containers/SearchResult";


const Routes = ({ childProps }) => {
    return (
        <Switch>
            <NonPrivateRoute exact path="/login" component={Login} props={childProps}></NonPrivateRoute>
            
            <PrivateRoute exact path="/" component={Home} props={childProps}></PrivateRoute>
            <PrivateRoute exact path="/mybooks" component={MyBooks} props={childProps}></PrivateRoute>
            <PrivateRoute exact path="/addbook" component={AddBook} props={childProps}></PrivateRoute>
            <PrivateRoute path="/search/:query" component={SearchResult} props={childProps}></PrivateRoute>
        </Switch>
    );
}


export default Routes;