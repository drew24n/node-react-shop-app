import React from "react";
import style from './LeftSideNav.module.scss';
import {NavLink} from "react-router-dom";
import {Button, Drawer, Menu} from "antd";
import {logout} from "../../../redux/authReducer";
import {
    CheckCircleOutlined,
    HistoryOutlined,
    LoginOutlined, PoweroffOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UploadOutlined
} from "@ant-design/icons";

export const LeftSideNav = ({toggleNav, currentPath, setToggleNav, authState, dispatch}: any) => {
    return (
        <Drawer className={style.container} title={authState.user.name ? `Welcome, ${authState.user.name}` : 'Menu'}
                onClose={() => setToggleNav(false)} placement={"left"} closable={true} visible={toggleNav}>
            <Menu className={style.horizontalMenu} mode={"inline"} selectedKeys={[currentPath]}
                  onClick={() => setToggleNav(false)}>
                {!authState.isAuthorized &&
                <>
                    <Menu.Item key={'/register'}><NavLink exact to={'/register'}>
                        <CheckCircleOutlined/>Sign up</NavLink></Menu.Item>
                    <Menu.Item key={'/login'}><NavLink exact to={'/login'}>
                        <LoginOutlined/>Login</NavLink></Menu.Item>
                </>}
                {authState.isAuthorized &&
                <>
                    <Menu.Item key={'/products'}><NavLink exact to={'/products'}>
                        <ShoppingOutlined/>Products</NavLink></Menu.Item>
                    <Menu.Item key={'/history'}><NavLink exact to={'/history'}>
                        <HistoryOutlined/>History</NavLink></Menu.Item>
                    <Menu.Item key={'/products/cart'}><NavLink exact to={'/products/cart'}/>
                        <ShoppingCartOutlined/>Cart</Menu.Item>
                    <Menu.Item key={'/products/upload'}><NavLink exact to={'/products/upload'}/>
                        <UploadOutlined/>Upload</Menu.Item>
                    <Menu.Item className={style.logoutBtn}>
                        <Button icon={<PoweroffOutlined/>} onClick={() => dispatch(logout())}>Logout</Button></Menu.Item>
                </>}
            </Menu>
        </Drawer>
    )
}