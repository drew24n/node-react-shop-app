import React from "react";
import style from './History.module.scss';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const History = () => {
    return (
        <main className={style.container}>History</main>
    )
}

export default withAuthRedirect(History)