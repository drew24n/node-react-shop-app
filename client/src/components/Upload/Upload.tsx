import React, {ComponentType, memo} from "react";
import style from './Upload.module.scss';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

interface uploadType {
    isAuthorized: boolean
}

function Upload() {
    return (
        <main className={style.container}>Upload</main>
    )
}

export default compose<ComponentType<uploadType>>(withAuthRedirect, memo)(Upload)