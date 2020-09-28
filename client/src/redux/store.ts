import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./authReducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer as formReducer} from "redux-form";

type rootReducerType = typeof rootReducer
export type stateType = ReturnType<rootReducerType>

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : (f: () => void) => f
))