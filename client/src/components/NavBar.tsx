import React, {useEffect, useState} from "react";
import style from '../styles/NavBar.module.scss';
import {NavLink, useLocation} from "react-router-dom";
import {Button, Menu} from "antd";
import {MenuOutlined, ShoppingCartOutlined, UploadOutlined} from "@ant-design/icons";
import {SideNav} from "./SideNav";
import {logout} from "../redux/thunks/authThunks";
import {useDispatch, useSelector} from "react-redux";
import {stateType} from "../interfaces/stateType";

export function NavBar() {
    const authState = useSelector((state: stateType) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()

    const [navPath, setNavPath] = useState('')
    const [sideNav, toggleSideNav] = useState(false)

    useEffect(() => {
        setNavPath(location.pathname)
    }, [location.pathname])

    return (
        <header className={style.container}>
            <NavLink exact to={'/'}>
                <h1>Travel</h1>
            </NavLink>
            <div className={style.rightSection}>
                <Menu className={style.horizontalMenu} mode={'horizontal'} selectedKeys={[navPath]}>
                    {!authState.isAuthorized
                        ? <>
                            <Menu.Item key={'/register'}>
                                <NavLink to={'/register'}>Sign up</NavLink>
                            </Menu.Item>
                            <Menu.Item key={'/login'}>
                                <NavLink to={'/login'}>Login</NavLink>
                            </Menu.Item>
                        </>
                        : <>
                            <Menu.Item key={'/'}>
                                <NavLink exact to={'/'}>Products</NavLink>
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
                <Button className={style.logoutBtn} onClick={() => dispatch(logout())}>Logout</Button>}
                <Button icon={<MenuOutlined/>} className={style.leftSideNavBtn}
                        onClick={() => toggleSideNav(!sideNav)}/>
            </div>
            <SideNav sideNav={sideNav} navPath={navPath} toggleSideNav={toggleSideNav}/>
        </header>
    )
}