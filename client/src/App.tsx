import React, {useEffect} from "react";
import style from './styles/App.module.scss';
import {Switch, Route} from "react-router-dom";
import {NavBar} from "./components/NavBar";
import Products from "./pages/Products";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import {Page404} from "./pages/Page404";
import {useDispatch, useSelector} from "react-redux";
import {Preloader} from "./components/Preloader";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Cart from "./pages/Cart";
import {useHistory} from 'react-router-dom';
import {stateType} from "./interfaces/stateType";
import {auth} from "./redux/thunks/authThunks";
import {notificationError} from "./utils/notifications";

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
            <Switch><NavBar history={history} authState={state.auth} dispatch={dispatch}/></Switch>
            <Switch>
                <Route exact path={'/(|products)'} render={() => <Products isAuthorized={state.auth.isAuthorized}/>}/>
                <Route path={'/upload'} render={() => <Upload isAuthorized={state.auth.isAuthorized}/>}/>
                <Route path={'/cart'} render={() => <Cart isAuthorized={state.auth.isAuthorized}/>}/>
                <Route path={'/history'} render={() => <History isAuthorized={state.auth.isAuthorized}/>}/>
                <Route path={'/register'} render={() => <Register authState={state.auth} dispatch={dispatch}/>}/>
                <Route path={'/login'} render={() => <Login authState={state.auth} dispatch={dispatch}/>}/>
                <Route render={() => <Page404/>}/>
            </Switch>
        </div>
    )
}