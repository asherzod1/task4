import React, {useState} from 'react';
import { Button, Form, Input, message } from 'antd';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../api/host";


const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};



function Register(props) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onFinish = (values) => {
        setLoading(true)
        axios.post(`${BASE_URL}/auth/register`, values).then(res=>{
            console.log(res)
            message.success("You registered successfully")
            message.success("Please login with your email password")
            setLoading(false)
            navigate('/login')
        })
            .catch((err)=>{
                message.error("Something went wrong")
                setLoading(false)
            })
        console.log('Success:', values);
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div >
                <h3 className="mb-4">Welcome to Registration page</h3>
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
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

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
                            Register
                        </Button>
                    </Form.Item>
                    <p style={{display:'inline-block', fontWeight:"600", marginRight:"6px"}}>If you have account:</p>
                    <Link to={"/login"}>Login</Link>
                </Form>
            </div>
        </div>
    );
}

export default Register;
