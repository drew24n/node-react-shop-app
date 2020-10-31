import React, {useEffect} from "react";
import style from './App.module.scss';
import {Switch, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import WrongUrl from "./components/WrongUrl/WrongUrl";
import {auth, notificationError} from "./redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "./components/Preloader/Preloader";
import {stateType} from "./redux/store";
import Upload from "./components/Upload/Upload";
import History from "./components/History/History";
import Cart from "./components/Cart/Cart";
import {useHistory} from 'react-router-dom';

export function App() {
    const state = useSelector((state: stateType) => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(auth())
        window.addEventListener("unhandledrejection", (reason: PromiseRejectionEvent) => {
            notificationError(reason.reason.message)
        })
    }, [dispatch])

    if (!state.auth.isInitialized) return <Preloader/>

    return (
        <div className={style.container}>
            <Switch><Header history={history} authState={state.auth} dispatch={dispatch}/></Switch>
            <Switch>
                <Route exact path={'/(|products)'} render={() => <Products isAuthorized={state.auth.isAuthorized}/>}/>
                <Route path={'/upload'} render={() => <Upload isAuthorized={state.auth.isAuthorized}/>}/>
                <Route path={'/cart'} render={() => <Cart isAuthorized={state.auth.isAuthorized}/>}/>
                <Route path={'/history'} render={() => <History isAuthorized={state.auth.isAuthorized}/>}/>
                <Route path={'/register'} render={() => <Register authState={state.auth} dispatch={dispatch}/>}/>
                <Route path={'/login'} render={() => <Login authState={state.auth} dispatch={dispatch}/>}/>
                <Route render={() => <WrongUrl/>}/>
            </Switch>
        </div>
    )
}