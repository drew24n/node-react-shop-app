import React, {memo, useEffect, useState} from "react";
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {Button, Menu} from "antd";
import {logout} from "../../redux/authReducer";
import {MenuOutlined, ShoppingCartOutlined, UploadOutlined} from "@ant-design/icons";
import LeftSideNav from "./LeftSideNav/LeftSideNav";

function Header({history, authState, dispatch}: any) {
    const [path, setPath] = useState('')
    const [nav, toggleNav] = useState(false)

    useEffect(() => {
        setPath(history.location.pathname)
    }, [history.location.pathname])

    return (
        <header className={style.container}>
            <NavLink exact to={'/products'}>
                <h1>Travel</h1>
            </NavLink>
            <div className={style.rightSection}>
                <Menu className={style.horizontalMenu} mode={'horizontal'} selectedKeys={[path]}>
                    {!authState.isAuthorized &&
                    <>
                        <Menu.Item key={'/register'}>
                            <NavLink to={'/register'}>Sign up</NavLink>
                        </Menu.Item>
                        <Menu.Item key={'/login'}>
                            <NavLink to={'/login'}>Login</NavLink>
                        </Menu.Item>
                    </>
                    }
                    {authState.isAuthorized &&
                    <>
                        <Menu.Item key={'/products'}>
                            <NavLink to={'/products'}>Products</NavLink>
                        </Menu.Item>
                        <Menu.Item key={'/history'}>
                            <NavLink to={'/history'}>History</NavLink>
                        </Menu.Item>
                        <Menu.Item key={'/cart'}>
                            <NavLink to={'/cart'}/>
                            <ShoppingCartOutlined/>
                        </Menu.Item>
                        <Menu.Item key={'/upload'}>
                            <NavLink to={'/upload'}/>
                            <UploadOutlined/>
                        </Menu.Item>
                    </>
                    }
                </Menu>
                {authState.isAuthorized &&
                <Button className={style.logoutBtn} onClick={() => dispatch(logout())}>Logout</Button>
                }
                <Button icon={<MenuOutlined/>} className={style.leftSideNavBtn} onClick={() => toggleNav(true)}/>
            </div>
            <LeftSideNav nav={nav} path={path} toggleNav={toggleNav} authState={authState} dispatch={dispatch}/>
        </header>
    )
}

export default memo(Header)