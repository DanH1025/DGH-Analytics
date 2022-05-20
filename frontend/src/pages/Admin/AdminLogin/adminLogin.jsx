import React, {useState, useEffect , useRef} from 'react'
import './adminLogin.css'

import {Link} from 'react-router-dom';
// import {Button} from '@material-ui/core';

import { Form, Input,message,Button } from 'antd';
import axios from 'axios';

import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MailIcon from '@material-ui/icons/Mail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from "../../../context/AuthProvider";
import useAuth from '../../../hooks/useAuth';

import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";
import { useCookies } from 'react-cookie';

export default function AdminLogin() {
		const { setAuth } = useContext(AuthContext);
		const navigate = useNavigate();

		const [cookie, setCookie] = useCookies(['user']);

		// for error mesaage
    const [errMsg, setErrMsg] = useState('');
    const userRef = useRef();
    const errRef = useRef();

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [user , setUser] = useState('');
    const [pwd, setPwd] = useState('');
    // const [errMsg , setErrMsg] = useState({
        // user_name:''
    // });
    const [success , setSuccess] = useState(false);
    const [signupOrLogin , setSignupOrLogin] = useState(false);

    // const [regVal , setRegVal] = useState({
    //     userName: '',
    //     email: '',
    //     confirm_email: '',
    //     token_key: '',
    //     password: '',
    //     confirm_password: ''
    // })


    // useEffect(()=>{
    //     userRef.current.focus();
    // },[])

    // useEffect(()=>{
    //     setErrMsg('')
    // } , [user, pwd])
 
    const [isError, setIsError] = useState('')

    const onFinish = async (values) =>{
        //  console.log('Success:', values);    
			const email = values.email;
			const password = values.password;         
    	try {
				const response = await axios.post('http://localhost:5000/api/getAdminUser', 
					{
						email: values.email,
						password: values.password
					}
				)
				console.log(response.data);
				if(response.data.data){
					console.log(response);
					console.log('admin');
					const accessToken = response.data.accessToken;
					const role = response.data.data.user_role;

					let expires = new Date();
          expires.setTime(expires.getTime() + (2 * 60 * 60 * 1000));
          
          setCookie('ADemail', email, {path: '/', expires});
          setCookie('ADrole', role, {path: '/', expires});
          setCookie('ADaccess_token', accessToken, { path: '/',  expires});

					setAuth({email, password, accessToken});
					navigate(from, { replace: true })
					// navigate(from, { replace: true });
				}else{
					console.log('slave');
					// navigate('/productManagerDashboard')
					setErrMsg('Some error');
				}
    	}catch (err) {
    	  console.log(err.response.status); 
          if (!err?.response) {
            setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
            setErrMsg('Missing Username');
          } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
          } else {
            setErrMsg('Login Failed');
          } 
				console.log(errMsg);
    	}
    };

		const onSignUpFinish = async (value) => {
			console.log('sign up' + value.user_name);
		}
  

  return (
    <div className='adminLogin'>
			<div className="adminLoginWrapper">
				<div className="al_container">
					<div className="al_container_wrapper">
									<p ref={errRef} 
									className={errMsg ? "errmsg" : "offscreen"} 
									aria-live="assertive">
                    {errMsg}
									</p>
						{
							signupOrLogin? (
							<>
								<div className="al_header">
									<h4>Administration SignUp</h4>                                    
								</div>
								<div className="al_body">

									<Form 
										name="normal_login"
										className="admin_register_form"      onFinish={onSignUpFinish}>
										<Form.Item
											name="user_name"
											rules={[{required: true
											, message: "UserName is required" 
										}]}>
											<Input type="text" 
												prefix={<PermIdentityIcon/>} 
												placeholder="UserName"/>
										</Form.Item>

										<Form.Item
												name="email"
												rules={[{required: true
														, message: "Email is not Valid",
															pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
														}]}
										>
												<Input type="email" 
																prefix={<MailOutlineIcon/>} 
																placeholder="Email Address"                                                        
												/>
										</Form.Item>

										<Form.Item
												name="confirm_email"
												rules={[{required: true
														, message: "confirm your email" ,
														pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
														}]}
										>
												<Input type="email" 
																prefix={<MailIcon/>} 
																placeholder="Confirm Email" 
												/>
										</Form.Item>

										<Form.Item
												name="access_key"
												rules={[{required: true
														, message: "Access key is required"
														}]}
										>
												<Input type="text" 
																prefix={<VpnKeyIcon />} placeholder="Access Key" 
												/>
										</Form.Item>

										<Form.Item
												name="password"
												rules={[{required: true
														, message: "Password is required",                                                
														}]}
										>
												<Input type="password" 
																prefix={<LockOpenIcon />} placeholder="Password" 
												/>
										</Form.Item>

										<Form.Item
												name="confirm_password"
												rules={[{required: true
														, message: "conifrm your password"
														}]}
										>
												<Input type="password" 
																prefix={<LockIcon/>} placeholder="Confirm Password" 
												/>
										</Form.Item>

										<Form.Item
											name="signUp">
													<Button 
														className="al_login_btn"
														htmlType="submit">
															SignUp
												</Button>
										</Form.Item>
									</Form>
								</div>

									<p onClick={()=> setSignupOrLogin(false)}>
										Login
									</p>
							</>
							):
							(
								<>
									<div className="al_header">
										<h4>Administration Login</h4>  
									</div>
									<div className="al_body">
										<Form
										name="normal_login"
										className="login_form"
										onFinish={onFinish}>
											<Form.Item
												name="email"
												rules={[{required: true, message: "Email is required"}]}>
												<Input type="text" 
																prefix={<MailOutlineIcon/>} 
																placeholder="Email Address"/>
											</Form.Item>

											<Form.Item
												name="password"
												rules={[{required: true, message: "Password is required"}]}>
												<Input type="password" 
													prefix={<LockOpenIcon />} placeholder="Password"/>
											</Form.Item>

											<Form.Item name="login">
												<Button 
													className="al_login_btn"
													htmlType="submit">
														Login
												</Button>
											</Form.Item>
										</Form>   
									</div>                              
										
									<p onClick={()=> setSignupOrLogin(true)}>SignUp</p>
										
								</>
							)
						}
					</div>
				</div>
			</div>
    </div>
  )
}
