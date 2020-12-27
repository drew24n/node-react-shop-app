import React from "react";
import style from '../styles/SideNav.module.scss';
import {NavLink} from "react-router-dom";
import {Button, Drawer, Menu} from "antd";
import {logout} from "../redux/thunks/authThunks";
import {
    CheckCircleOutlined,
    HistoryOutlined,
    LoginOutlined, PoweroffOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UploadOutlined
} from "@ant-design/icons";

export function SideNav({nav, path, toggleNav, authState, dispatch}: any) {
    return (
        <Drawer className={style.container} title={authState.user.name ? `Welcome, ${authState.user.name}` : 'Menu'}
                onClose={() => toggleNav(false)} placement={"left"} closable={true} visible={nav}>
            <Menu className={style.horizontalMenu} mode={"inline"} selectedKeys={[path]}
                  onClick={() => toggleNav(false)}
            >
                {!authState.isAuthorized &&
                <>
                    <Menu.Item key={'/register'}>
                        <NavLink to={'/register'}><CheckCircleOutlined/>Sign up</NavLink>
                    </Menu.Item>
                    <Menu.Item key={'/login'}>
                        <NavLink to={'/login'}>
                            <LoginOutlined/>Login</NavLink>
                    </Menu.Item>
                </>
                }
                {authState.isAuthorized &&
                <>
                    <Menu.Item key={'/products'}>
                        <NavLink to={'/products'}>
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