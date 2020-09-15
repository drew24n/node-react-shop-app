import React from "react";
import style from './Login.module.scss';
import {Button, Checkbox, Form, Input} from "antd";
import {Link} from "react-router-dom";

export const Login = () => {
    return (
        <main className={style.container}>
            <div>
                <h1>Log in</h1>
                <Form initialValues={{remember: false}}>
                    <Form.Item name={'email'} rules={[{required: true, message: 'Please input your email!'}]}>
                        <Input type="email"/>
                    </Form.Item>
                    <Form.Item name={'password'} rules={[{required: true, message: 'Please input your password!'}]}>
                        <Input type="password"/>
                    </Form.Item>
                    <div>
                        <Checkbox>Remember me</Checkbox>
                        <Link to={"/register"}>Register now!</Link>
                    </div>
                    <Button type="primary" htmlType="submit">Enter</Button>
                </Form>
            </div>
        </main>
    )
}