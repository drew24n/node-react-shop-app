import React, {ComponentType} from "react";
import style from '../styles/History.module.scss';
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";

interface historyType {
    isAuthorized: boolean
}

function History() {
    return (
        <main className={style.container}>History</main>
    )
}

export default compose<ComponentType<historyType>>(withAuthRedirect)(History)