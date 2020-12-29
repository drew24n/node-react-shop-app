import React from "react";
import style from '../styles/Upload.module.scss';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

function Upload() {
    return (
        <main className={style.container}>Upload</main>
    )
}

export default compose(withAuthRedirect)(Upload)