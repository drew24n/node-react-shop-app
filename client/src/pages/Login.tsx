import React from "react";
import style from '../styles/Login.module.scss';
import {Button, Input, Spin, Form} from "antd";
import {Redirect} from "react-router-dom";
import {login} from "../redux/thunks/authThunks";
import {loginType} from "../interfaces/authApiType";
import {useDispatch, useSelector} from "react-redux";
import {stateType} from "../interfaces/stateType";
import {validateInputs} from "../utils/validateInputs";

export const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}

export function Login() {
    const authState = useSelector((state: stateType) => state.auth)
    const dispatch = useDispatch()

    const loginHandler = (payload: loginType) => {
        if (payload) {
            dispatch(login({...payload}))
        }
    }

    if (authState.isAuthorized) return <Redirect exact to={'/'}/>

    return (
        <main className={style.container}>
            <Spin spinning={authState.isFetching} size="large">
                <h1>Log in</h1>
                <Form onFinish={loginHandler} validateMessages={validateInputs} {...layout}>
                    <Form.Item name={'email'} label="email"
                               rules={[{required: true, type: 'email', whitespace: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'password'} label="password"
                               rules={[{required: true, max: 65, min: 5, whitespace: true}]}>
                        <Input.Password/>
                    </Form.Item>
                    <Button type="primary" htmlType={'submit'}>Enter</Button>
                </Form>
            </Spin>
        </main>
    )
}