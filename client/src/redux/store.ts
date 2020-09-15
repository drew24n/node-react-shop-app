import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./authReducer";
import {reducer as formReducer} from "redux-form";
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer
})

type rootReducerType = typeof rootReducer
export type stateType = ReturnType<rootReducerType>

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeWithDevTools() ? composeWithDevTools() : (f: () => void) => f
))