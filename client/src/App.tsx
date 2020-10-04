import React, {useEffect} from "react";
import style from './App.module.scss';
import {HashRouter, Switch, Route} from "react-router-dom";
import {Header} from "./components/Header/Header";
import Home from "./components/Home/Home";
import {Register} from "./components/Register/Register";
import {Login} from "./components/Login/Login";
import {WrongUrl} from "./components/WrongUrl/WrongUrl";
import {auth, notificationError} from "./redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "./components/Preloader/Preloader";
import {stateType} from "./redux/store";

export const App = () => {
    let authState = useSelector((state: stateType) => state.auth)
    let dispatch = useDispatch()

    let catchAllUnhandledErrors = (reason: PromiseRejectionEvent) => {
        notificationError(reason.reason.message)
    }

    useEffect(() => {
        dispatch(auth())
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
    }, [dispatch])

    if (!authState.isInitialized) return <Preloader/>

    return (
        <div className={style.container}>
            <HashRouter basename={'/'}>
                <Header/>
                <Switch>
                    <Route exact path={'/'}><Home isAuthorized={authState.isAuthorized}/></Route>
                    <Route path={'/register'}><Register/></Route>
                    <Route path={'/login'}><Login/></Route>
                    <Route><WrongUrl/></Route>
                </Switch>
            </HashRouter>
        </div>
    )
}