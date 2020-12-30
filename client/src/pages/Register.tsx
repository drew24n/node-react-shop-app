import React from "react";
import style from '../styles/Register.module.scss';
import {Button, Form, Input, Spin} from "antd";
import {Redirect, useHistory} from "react-router-dom";
import {register} from "../redux/thunks/authThunks";
import {registerType} from "../interfaces/authApiType";
import {useDispatch, useSelector} from "react-redux";
import {stateType} from "../interfaces/stateType";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {validateInputs} from "../utils/validateInputs";
import {layout} from "./Login";

type dispatchType = ThunkDispatch<stateType, any, AnyAction>

export function Register() {
    const authState = useSelector((state: stateType) => state.auth)
    const dispatch: dispatchType = useDispatch()
    const history = useHistory()

    const registerHandler = async (payload: registerType) => {
        if (payload) {
            const res = await dispatch(register({...payload}))
            if (res && res.success) {
                history.push('/login')
            }
        }
    }

    if (authState.isAuthorized) return <Redirect exact to={'/'}/>

    return (
        <main className={style.container}>
            <Spin spinning={authState.isFetching} size="large">
                <h1>Sign up</h1>
                <Form onFinish={registerHandler} validateMessages={validateInputs} {...layout}>
                    <Form.Item name={'name'} label="name"
                               rules={[{required: true, max: 25, min: 3, whitespace: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'lastName'} label="last name"
                               rules={[{required: true, max: 25, min: 3, whitespace: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'email'} label="email"
                               rules={[{required: true, type: 'email', whitespace: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name={'password'} label="password"
                               rules={[{required: true, max: 65, min: 5, whitespace: true}]}>
                        <Input.Password/>
                    </Form.Item>
                    <Button type='primary' htmlType={'submit'}>Register</Button>
                </Form>
            </Spin>
        </main>
    )
}