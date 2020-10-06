import React, {useEffect, useState} from "react";
import style from './Header.module.scss';
import {NavLink} from "react-router-dom";
import {Button, Menu} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/authReducer";
import {stateType} from "../../redux/store";
import {MenuOutlined, ShoppingCartOutlined, UploadOutlined} from "@ant-design/icons";
import {LeftSideNav} from "./LeftSideNav/LeftSideNav";

export const Header = ({location}: any) => {
    let authState = useSelector((state: stateType) => state.auth)
    let dispatch = useDispatch()

    const [currentPath, setCurrentPath] = useState('')

    useEffect(() => {
        setCurrentPath(location.pathname)
    }, [location.pathname])

    const [toggleNav, setToggleNav] = useState(false)

    return (
        <header className={style.container}>
            <NavLink exact to={'/products'}><h1>Travel</h1></NavLink>
            <div className={style.rightSection}>
                <Menu className={style.horizontalMenu} mode={'horizontal'} selectedKeys={[currentPath]}>
                    {!authState.isAuthorized &&
                    <>
                        <Menu.Item key={'/register'}><NavLink exact to={'/register'}>Sign up</NavLink></Menu.Item>
                        <Menu.Item key={'/login'}><NavLink exact to={'/login'}>Login</NavLink></Menu.Item>
                    </>}
                    {authState.isAuthorized &&
                    <>
                        <Menu.Item key={'/products'}><NavLink exact to={'/products'}>Products</NavLink></Menu.Item>
                        <Menu.Item key={'/history'}><NavLink exact to={'/history'}>History</NavLink></Menu.Item>
                        <Menu.Item key={'/products/cart'}><NavLink exact to={'/products/cart'}/>
                            <ShoppingCartOutlined/></Menu.Item>
                        <Menu.Item key={'/products/upload'}><NavLink exact to={'/products/upload'}/>
                            <UploadOutlined/></Menu.Item>
                    </>}
                </Menu>
                {authState.isAuthorized &&
                <Button className={style.logoutBtn} onClick={() => dispatch(logout())}>Logout</Button>}
                <Button icon={<MenuOutlined/>} className={style.leftSideNavBtn} onClick={() => setToggleNav(true)}/>
            </div>
            <LeftSideNav toggleNav={toggleNav} currentPath={currentPath} setToggleNav={setToggleNav}
                         authState={authState} dispatch={dispatch}/>
        </header>
    )
}