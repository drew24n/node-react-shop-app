import React from "react";
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/authReducer";
import {stateType} from "../../redux/store";

export const Header = () => {
    let authState = useSelector((state: stateType) => state.auth)
    let dispatch = useDispatch()

    return (
        <header className={style.container}>
            <div>
                <h2>Travel</h2>
                <NavLink activeClassName={style.active} exact to={'/'}>Home</NavLink>
            </div>
            <div>
                {!authState.isAuthorized && <NavLink activeClassName={style.active} to={'/register'}>Sign up</NavLink>}
                {!authState.isAuthorized && <NavLink activeClassName={style.active} to={'/login'}>Login</NavLink>}
                {authState.isAuthorized && <Button onClick={() => dispatch(logout())}>Logout</Button>}
            </div>
        </header>
    )
}