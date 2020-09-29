import React, {FC} from "react";
import style from './Register.module.scss';
import {Button, Input, Spin} from "antd";
import {register} from "../../redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {stateType} from "../../redux/store";
import {registerType} from "../../api/auth";

export const Register = () => {
    let authState = useSelector((state: stateType) => state.auth)
    let dispatch = useDispatch()

    let registerFunc = (payload: any) => {
        if (payload) {
            dispatch(register({...payload}))
        }
    }

    return (
        <main className={style.container}>
            <Spin spinning={authState.isFetching} size="large">
                <h1>Sign up</h1>
                <LoginReduxForm onSubmit={registerFunc}/>
            </Spin>
        </main>
    )
}

const AntInput = (props: any) => <Input {...props.input} {...props} input={null} meta={null}/>

const RegisterForm: FC<InjectedFormProps<registerType, any> & any> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field placeholder={'name'} component={AntInput} name={'name'} type={'text'}/>
            <Field placeholder={'last name'} component={AntInput} name={'lastName'} type={'text'}/>
            <Field placeholder={'email'} component={AntInput} name={'email'} type={'email'}/>
            <Field placeholder={'password'} component={AntInput} name={'password'} type={'password'}/>
            <Button type='primary' htmlType={'submit'}>Register</Button>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: "register"})(RegisterForm)