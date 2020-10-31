import React, {memo} from "react";
import style from "./Preloader.module.scss";
import {Spin} from "antd";

function Preloader() {
    return (
        <div className={style.container}>
            <Spin spinning={true} size="large" tip="Starting up server, please wait..."/>
        </div>
    )
}

export default memo(Preloader)