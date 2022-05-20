import React , {useState, useRef} from 'react'
import './login.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

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

    // for error mesaage
    const [errMsg, setErrMsg] = useState('');
    const userRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state) => state.getUser.user);

    const from = location.state?.from?.pathname || "/";

    const onFinish = async (values) => {
        console.log('Success:', values);

        try{
            let response;
            if(inputState.name === 'phone_number'){                
                // dispatch(loginWithPhone(values.phone_number, values.password, cookies, setCookie))
                response = await axios.post('http://localhost:5000/api/app', {
                    phone: values.phone_number,
                    password: values.password
                })
            } else{
                response = await axios.post('http://localhost:5000/api/appUser', {
                    email: values.email,
                    password: values.password
                })
            }
            console.log(response.data[0].id);
            if(response.data[0].id){
                console.log('sucess');

                let expires = new Date();
                expires.setTime(expires.getTime() + (2 * 60 * 60 * 1000))

                setCookie('uid', response.data[0].id, {path: '/', expires})
                setCookie('fname', response.data[0].fname, {path: '/', expires})
                setCookie('lname', response.data[0].lname, {path: '/', expires})

                response?.data[0]?.phoneNo 
                ?setCookie('phoneNo', response.data[0].phoneNo, {path: '/', expires}) 
                :setCookie('email', response.data[0].email, {path: '/', expires})
                
                setCookie('access_token', response.data[0].accessToken, { path: '/',  expires})

                // console.log(cookies.uid);
                // return ( <Navigate to='/' /> )
                console.log(from);
                navigate(from, { replace: true });
            }else{
                console.log('login faill');
                console.log(cookies.uid);
            }
        }catch (err) {
            console.log(err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
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
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}</p>
                    <Form
                        name="normal_login"
                        className="login-form"
                        // initialValues={{ remember: true }}
                        onFinish={onFinish}
                        >
                        <Form.Item
                            name={inputState.name}
                            // rules={[{required: inputRule.required 
                            //     , message: inputState.name==='email'? inputRule.Emessage:inputRule.Pmessage
                            //     , pattern: /(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/}]}
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