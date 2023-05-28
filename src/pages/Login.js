import React, {useState} from 'react';
import { Button, Form, Input, message } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL, TOKEN_ACCESS} from "../api/host";


function Login(props) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const onFinish = (values) => {
        setLoading(true)
        axios.post(`${BASE_URL}/auth/login`, values).then(res=>{
            console.log(res)
            localStorage.setItem(TOKEN_ACCESS, res.data.token)
            message.success("You have successfully logged in")
            setLoading(false)
            navigate('/')
        })
            .catch(err=>{
                message.error(err.response.data.error)
                setLoading(false)
            })
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div >
                <h3 className="mb-4 text-center">Login page</h3>
                <Form
                    name="basic"
                    layout="vertical"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        // wrapperCol={{
                        //     offset: 16,
                        //     span: 16,
                        // }}
                    >
                        <Button loading={loading} style={{width:'100%'}} type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                    <p style={{display:'inline-block', fontWeight:"600", marginRight:"6px"}}>If you haven't account, Please :</p>
                    <Link to={"/register"}>Register</Link>
                </Form>
            </div>
        </div>
    );
}

export default Login;
