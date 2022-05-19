import React , {useState} from 'react'
import './login.css'
import { Link } from 'react-router-dom';

import { useCookies } from 'react-cookie';
import { Route, Navigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { Switch } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined,PhoneOutlined ,MailOutlined ,GooglePlusOutlined  } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithPhone } from '../../../redux/actions/loginAction';
import { useNavigate, useLocation } from "react-router-dom";


export default function Login(){

    const [cookies, setCookie] = useCookies(['user']);
    const dispatch = useDispatch();
    const [inputRule, setInputRule] = useState({
        required:true,
        Emessage:"Email is required",
        Pmessage:"Phone Number is Invalid",
        passMessage:"Password is required",
        CPmessage:"Confirm Password is required"
    })

    const user = useSelector((state) => state.getUser.user);
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onFinish = (values) => {
        console.log('Success:', values);
        if(inputState.name === 'phone_number'){                
            dispatch(loginWithPhone(values.phone_number, values.password, cookies, setCookie))
        }
        if(user){
            console.log('sucess');
            console.log(cookies.uid);
            // return ( <Navigate to='/' /> )
            navigate(from, { replace: true });
        }else{
            console.log('login faill');
            console.log(cookies.uid);
        }
    };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

        const [inputState , setInputState] = useState({            
            name: "email",
            type: "email",
            placeholder: "Email Address"
           
        })
        const switchHanlder = ()=>{
            if(inputState.name === "email"){
                setInputState({
                    name: "phone_number",
                    type: "number",
                    placeholder: "Phone Number"
                })
            }else{
                setInputState({
                    name: "email",
                    type: "email",
                    placeholder: "Email Address"
                })
            }
          
        }
        const google = ()=>{
            window.open("http://localhost:5000/auth/google", "_self")
        }

    return(
        <>
        <div className='login'>
            <div className="loginContainer">
                <div className="header">
                    
                    <h2>Login</h2>
                </div>
                <div className="loginTypeSwitch">
                    <Switch onChange={switchHanlder} /> <label htmlFor="">Login With Phone Number</label>
                </div>
                <div className="loginForm">

                    <Form
                        name="normal_login"
                        className="login-form"
                        // initialValues={{ remember: true }}
                        onFinish={onFinish}
                        >
                        <Form.Item
                            name={inputState.name}
                            rules={[{required: inputRule.required 
                                , message: inputState.name==='email'? inputRule.Emessage:inputRule.Pmessage
                                , pattern: /(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/}]}
                        >
                            <Input type={inputState.type} prefix={inputState.type === "email" ? <MailOutlined className="site-form-item-icon" />: <PhoneOutlined className="site-form-item-icon" /> } placeholder={inputState.placeholder} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{required: inputRule.required , message: inputRule.passMessage}]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>
                        {/* <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                            Forgot password
                            </a>
                        </Form.Item> */}

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                    <p>Login </p>
                            </Button>
                            <br />

                            <div className="signUpWithGoogle" onClick={google} >
                                 <GooglePlusOutlined className="googleIcon" /> <span>Google</span>
                            </div>

                            Or <Link to='/signUp'>register now!</Link>
                        </Form.Item>
                    </Form>
                    
                </div>
            </div>
        </div>
    </>
    )
}