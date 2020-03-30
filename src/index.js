import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./containers/App";
import { Provider } from 'react-redux';
import configureStore from "./Store/configureStore";
import "./sass/main.scss";

const store = configureStore();

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>, 
    document.getElementById('root')
);