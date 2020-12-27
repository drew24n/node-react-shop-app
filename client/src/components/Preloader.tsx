import React from "react";
import style from "../styles/Preloader.module.scss";
import {Spin} from "antd";

export function Preloader() {
    return (
        <div className={style.container}>
            <Spin spinning={true} size="large" tip="Starting up server, please wait..."/>
        </div>
    )
}