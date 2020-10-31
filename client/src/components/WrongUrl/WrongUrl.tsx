import React, {memo} from "react";
import style from './WrongUrl.module.scss';

function WrongUrl() {
    return (
        <main className={style.container}>Page not found :(</main>
    )
}

export default memo(WrongUrl)