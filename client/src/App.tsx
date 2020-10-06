import React, {useEffect} from "react";
import style from './App.module.scss';
import {HashRouter, Switch, Route} from "react-router-dom";
import {Header} from "./components/Header/Header";
import Products from "./components/Products/Products";
import {Register} from "./components/Register/Register";
import {Login} from "./components/Login/Login";
import {WrongUrl} from "./components/WrongUrl/WrongUrl";
import {auth, notificationError} from "./redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "./components/Preloader/Preloader";
import {stateType} from "./redux/store";
import Upload from "./components/Products/Upload/Upload";
import History from "./components/History/History";
import Cart from "./components/Products/Cart/Cart";

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
                <Switch><Header/></Switch>
                <Switch>
                    <Route exact path={'/(|products)'}><Products isAuthorized={authState.isAuthorized}/></Route>
                    <Route exact path={'/products/upload'}><Upload isAuthorized={authState.isAuthorized}/></Route>
                    <Route exact path={'/products/cart'}><Cart isAuthorized={authState.isAuthorized}/></Route>
                    <Route exact path={'/history'}><History isAuthorized={authState.isAuthorized}/></Route>
                    <Route exact path={'/register'}><Register/></Route>
                    <Route exact path={'/login'}><Login/></Route>
                    <Route><WrongUrl/></Route>
                </Switch>
            </HashRouter>
        </div>
    )
}