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

//for signup

import { CircularProgress} from '@mui/material';


import { message } from 'antd';

import { createUserByPhone, createUserByEmail, getAllUser } from '../../../redux/actions/userActions';
import { useEffect } from 'react';






export default function Login(){

    const history = useNavigate();

    const [isLogin ,setIsLogin] = useState(true);
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
    const [signUpErr , setSignUpErr] = useState('');
    const userRef = useRef();
    const errRef = useRef();
    
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const user = useSelector((state) => state.getUser.user);
    
    const from = location.state?.from?.pathname || "/";
    
    //const lead = useSelector((state) => state.getUser.load);
    const [loader, setLoader] = useState(false);


    const checkuser = async(phone) => {
        const res = await axios.post('http://localhost:5000/api/checkUserPhone', {
            phone: phone
        });
        console.log(res.data);
        return res.data;
    }

    const checkemail = async(email) => {
        const res = await axios.post('http://localhost:5000/api/checkEmail', {
            email: email
        });
        console.log(res.data);
        return res.data;
    }

        // finishing up registeration
    const onFinish = async (values) => {
        console.log(values.FirstName)
        setLoader(true)
        if(inputState.name === "phone_number"){
            const existNumber = await checkuser(values.phone_number);
            console.log('exsnum:' + existNumber);
            if(!/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i.test(values.FirstName) || !/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i.test(values.LastName)){
            setSignUpErr("Invalid Name")
            setLoader(false)
            }
            else if(values.password !== values.confirm_password){
            // message.error("Passwords dont match")
                setSignUpErr("Passwords dont match")
                setLoader(false)
            }
            else if(values.password.length < 6){
            //  message.error("Password must be more than 6 characters")
                setSignUpErr("Password must be more than 6 characters");
                console.log(signUpErr)
                setLoader(false)
            }
            else if(existNumber){
            // message.error("Phone number already in use")
                setSignUpErr("Phone number already in use")
                console.log(signUpErr)
                setLoader(false)
            }
            else if(values.phone_number.length !== 10){
            //  message.error("Invalid Phone Number")
            //setErrMsg("Invalid Phone Number")
            setSignUpErr("Invalid Phone Number")
            console.log(signUpErr)
            setLoader(false)
            // setInputRule({...inputRule , Pmessage: "Invalid Phone Number"})
            }
            else{
                dispatch(createUserByPhone(values.FirstName, values.LastName, values.phone_number, values.password));
                    setIsLogin(true)
                    message.success("SignUp successfull"); 
                    setLoader(false)
            }
        }  else{
            const existEmail = await checkemail(values.email);
            console.log('exsnum:' + existEmail);
            if(!/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i.test(values.FirstName) || !/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i.test(values.LastName)){
                setSignUpErr("Invalid Name")
                setLoader(false)
                }
            else if(values.password !== values.confirm_password){
                //message.error("Passwords dont match")
                setSignUpErr("Passwords Dont Match")
                setLoader(false)
            }
            else if(values.password.length < 6){
               // message.error("Password must be more than 6 characters")
               setSignUpErr("Password must be more than 6 characters")
                setLoader(false)
            }
            else if(existEmail){
              //  message.error("Email already in use")
              setSignUpErr("Email already in use")
                setLoader(false)
            }
            else{
                dispatch(createUserByEmail(values.FirstName, values.LastName, values.email, values.password));
                    setIsLogin(true);
                    message.success("SignUp successfull"); 
                    setErrMsg('')
                    setSignUpErr('')
                    setLoader(false)
            }
        } 
        };

    const [loginInfo, setLoginInfo] = useState({
        email:'',
        phone: '',
        password:''
    })

    const loginHandler = async () => {
        //console.log('Success:', values);
        setLoader(true);
        console.log(loginInfo)

        try{
            let response;
            if(inputState.name === 'phone_number')
            {           
                response = await axios.post('http://localhost:5000/api/app', {
                    phone: loginInfo.phone,
                    password: loginInfo.password
                })
            } else{
                response = await axios.post('http://localhost:5000/api/appUser', {
                    email: loginInfo.email,
                    password: loginInfo.password
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
                setLoader(false);
                setErrMsg('')
                setSignUpErr('')
                // console.log(cookies.uid);
                // return ( <Navigate to='/' /> )
                console.log(from);
                navigate(from, { replace: true });
            }else{
                setLoader(false);
                console.log('login failed');
                console.log(cookies.uid);
                setLoader(false)
            }
        }catch (err) {
            setLoader(false);
            console.log(err);
            if (!err?.response) {
                setErrMsg('No Server Response');
                setLoader(false)
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username');
                setLoader(false)
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
                setLoader(false)
            } else {
                setErrMsg('Login Failed');
                setLoader(false)
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
        <div className='UserloginHolder'>
            <div className="dimBackground">            
            <div className="UserloginContainer">

                {isLogin? (
                    <div className='UserLoginFormSide'>
                    <div className="userLoginHeader">
                        <h2>Login</h2>  
                        <span>and Enjoy Shopping</span>
                    </div>
                    <div className="loginTypeSwitch">
                        <Switch style={{fontSize: "10px"}}  onChange={switchHanlder} /> <label htmlFor="">Login With Phone Number</label>
                    </div>
                    <div className="loginForm">
                        <p ref={errRef} className={errMsg ? "loginErrMsg" : "login_offscreen"} aria-live="assertive">
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
                                <Input type={inputState.type}
                                     prefix={inputState.type === "email" ? <MailOutlined 
                                     className="site-form-item-icon" />: <PhoneOutlined 
                                     className="site-form-item-icon" /> } 
                                     placeholder={inputState.placeholder} 
                                     value={inputState.type === "email"? loginInfo.email: loginInfo.phone}
                                     onChange={(e)=> inputState.type === "email"? setLoginInfo({...loginInfo, email: e.target.value}) : setLoginInfo({...loginInfo, phone:e.target.value})}
                                     />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{required: inputRule.required , message: inputRule.passMessage}]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                value={loginInfo.password}
                                onChange={(e)=> setLoginInfo({...loginInfo, password: e.target.value})}
                                />
                            </Form.Item>
                       
                            <Form.Item>
                                <Button  onClick={loginHandler}  type="primary" className="userLoginFormButton">
                                        <p>Login </p>
                                </Button>
                                <br />

                            <div className="signUpWithGoogle"  >
                                    {/* <img onClick={google} src="https://img.icons8.com/color/344/google-logo.png"  width={40} height={40} /> */}
                                    {/* <GooglePlusOutlined className="googleIcon" /> <span>Google</span> */}
                                    { loader ?
                                    <CircularProgress style={{color: "white"}} />:
                                        ""
                                    }
                            </div>

                                    <p className='goToRegister'  onClick={()=>setIsLogin(!isLogin)} >Or register Now!</p>
                                {/* Or <Link to='/signUp'>register now!</Link> */}
                            </Form.Item>
                        </Form>
                        
                    </div>
                    </div>
                ): (
                    <div className="UserLoginFormSide">
                    <div className="userCreateAccHeader" >
                        {/* <h1>Welcom </h1>  */}
                        <h2>Create an account</h2>
                    </div>
                    <div className="loginTypeSwitch">
                        <Switch onChange={switchHanlder} /> <label htmlFor="">SignUp With Phone Number</label>
                    </div>

                    <p ref={errRef} className={signUpErr ? "signUpErrMsg" : "signUpoffscreen"} aria-live="assertive">
                        {signUpErr}</p>

                    <div className="SignupForm">          
               
            
                        <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        >
                            <Form.Item
                                name='FirstName'
                                rules={[{required: true}]}
                                
                                >
                                <Input type='text' 
                                prefix={<UserOutlined className="site-form-item-icon" />} 
                                placeholder="First Name" 
                                
                                />
                            </Form.Item>
                            <Form.Item
                                name="LastName"
                                rules={[{required: true}]}
                                colon="false"
                                >
                                <Input type="text" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
                            </Form.Item>
            
                        <Form.Item
                            name={inputState.name}
                            rules={[{required: inputRule.required 
                                    , message: inputState.name==='email'? inputRule.Emessage:inputRule.Pmessage
                                    , pattern: inputState.name==='phone_number'? /(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/ : /(^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$)/  }]} 
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

                        <Form.Item
                            name="confirm_password"
                            rules={[{required: inputRule.required , message: inputRule.CPmessage}]}
                            // rules={[{ required: true, message: 'Please Confirm Password!' }]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Confirm Password"
                            />
                        </Form.Item>                         
            
                        <Form.Item>
                            <Button   type="primary" htmlType="submit" className="login-form-button">
                                    <p>SignUp </p>
                            </Button>
                            <br />
                            <div className="signUpWithGoogle"  >
                                    {/* <img onClick={google} src="https://img.icons8.com/color/344/google-logo.png"  width={40} height={40} /> */}
                                    {/* <GooglePlusOutlined className="googleIcon" /> <span>Google</span> */}
                                    { loader ?
                                    <CircularProgress style={{color: "white"}} />:
                                        ""
                                    }
                            </div>
                            <p className='goToRegister'  onClick={()=>setIsLogin(!isLogin)} >Or register Now!</p>
                            {/* Or <Link to='/login'>have account! Login here?</Link> */}
                        </Form.Item>
                    </Form>
                        
                    </div>
                </div>
                ) }
                {/* <div className="introSide">
                    <h2>Welcome To DGH Analytics Shop</h2>
                </div> */}
            </div>
        </div>
        </div>
    </>
    )
}