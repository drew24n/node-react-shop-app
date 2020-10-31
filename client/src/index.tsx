import React from "react";
import ReactDOM from "react-dom";
import {App} from "./App";
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.register()