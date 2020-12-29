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
import {stateType} from "./interfaces/stateType";
import {auth} from "./redux/thunks/authThunks";
import {notificationError} from "./utils/notifications";

export function App() {
    const authState = useSelector((state: stateType) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
        window.addEventListener("unhandledrejection", (reason: PromiseRejectionEvent) => {
            notificationError(reason.reason.message)
        })
    }, [dispatch])

    if (!authState.isInitialized) return <Preloader/>

    return (
        <div className={style.container}>
            <NavBar/>
            <Switch>
                <Route exact path={'/'} render={() => <Products/>}/>
                <Route path={'/upload'} render={() => <Upload/>}/>
                <Route path={'/cart'} render={() => <Cart/>}/>
                <Route path={'/history'} render={() => <History/>}/>
                <Route path={'/register'} render={() => <Register/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route render={() => <Page404/>}/>
            </Switch>
        </div>
    )
}