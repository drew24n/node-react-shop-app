import React from "react";
import style from './Upload.module.scss';
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";

const Upload = () => {
    return (
        <main className={style.container}>Upload</main>
    )
}

export default withAuthRedirect(Upload)