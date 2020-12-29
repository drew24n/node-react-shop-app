import React from "react";
import style from '../styles/History.module.scss';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

function History() {
    return (
        <main className={style.container}>History</main>
    )
}

export default compose(withAuthRedirect)(History)