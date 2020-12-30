import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./reducers/authReducer";
import {composeWithDevTools} from 'redux-devtools-extension';

export const rootReducer = combineReducers({
    auth: authReducer
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : (f: () => void) => f
))