import React from "react";
import style from '../styles/SideNav.module.scss';
import {NavLink} from "react-router-dom";
import {Button, Drawer, Menu} from "antd";
import {logout} from "../redux/thunks/authThunks";
import {
    CheckCircleOutlined, HistoryOutlined, LoginOutlined, PoweroffOutlined,
    ShoppingCartOutlined, ShoppingOutlined, UploadOutlined
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {stateType} from "../interfaces/stateType";

interface sideNavType {
    sideNav: boolean
    navPath: string
    toggleSideNav: (sideNav: boolean) => void
}

export function SideNav({sideNav, navPath, toggleSideNav}: sideNavType) {
    const authState = useSelector((state: stateType) => state.auth)
    const dispatch = useDispatch()

    return (
        <Drawer className={style.container} title={authState.user.name ? `Welcome, ${authState.user.name}` : 'Menu'}
                onClose={() => toggleSideNav(!sideNav)} placement={"left"} closable={true} visible={sideNav}>
            <Menu className={style.horizontalMenu} mode={"inline"} selectedKeys={[navPath]}
                  onClick={() => toggleSideNav(!sideNav)}>
                {!authState.isAuthorized
                    ? <>
                        <Menu.Item key={'/register'}>
                            <NavLink to={'/register'}><CheckCircleOutlined/>Sign up</NavLink>
                        </Menu.Item>
                        <Menu.Item key={'/login'}>
                            <NavLink to={'/login'}>
                                <LoginOutlined/>Login</NavLink>
                        </Menu.Item>
                    </>
                    : <>
                        <Menu.Item key={'/'}>
                            <NavLink exact to={'/'}>
                                <ShoppingOutlined/>Products</NavLink>
                        </Menu.Item>
                        <Menu.Item key={'/history'}>
                            <NavLink to={'/history'}>
                                <HistoryOutlined/>History</NavLink>
                        </Menu.Item>
                        <Menu.Item key={'/cart'}>
                            <NavLink to={'/cart'}/>
                            <ShoppingCartOutlined/>Cart
                        </Menu.Item>
                        <Menu.Item key={'/upload'}><NavLink to={'/upload'}/>
                            <UploadOutlined/>Upload
                        </Menu.Item>
                        <Menu.Item className={style.logoutBtn}>
                            <Button icon={<PoweroffOutlined/>} onClick={() => dispatch(logout())}>Logout</Button>
                        </Menu.Item>
                    </>}
            </Menu>
        </Drawer>
    )
}