import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers.js';

export  default function configureStore(){


    const store = createStore(
        reducers,
        applyMiddleware(thunk)
    );

    return store;
}