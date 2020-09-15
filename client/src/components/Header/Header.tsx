import React from "react";
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {Button} from "antd";

export const Header = () => {
    return (
        <header className={style.container}>
            <div>
                <h2>Travel</h2>
                <NavLink to={'/'}>Home</NavLink>
            </div>
            <div>
                <NavLink to={'/register'}>Sign up</NavLink>
                <NavLink to={'/login'}>Login</NavLink>
                <Button style={{display: 'none'}}>Logout</Button>
            </div>
        </header>
    )
}