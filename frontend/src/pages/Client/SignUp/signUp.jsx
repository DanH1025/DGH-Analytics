import React , {useState}from 'react'
import './signUp.css'



import { Link ,useNavigate} from 'react-router-dom';

import { message, Switch } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined ,MailOutlined,PhoneOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createUserByPhone, getAllUser } from '../../../redux/actions/userActions';
import { useEffect } from 'react';





export default function SignUp() {
    const history = useNavigate();

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllUser());
    },[])


    const getUser = useSelector(state => state.getUser)
    const {user} = getUser;   
    console.log(user)  
    
    

   
   
    
    const onFinish = (values) => {
           console.log(values.FirstName)
        if(inputState.name === "phone_number"){
            const existNumber = user.find(x=> x.phone_number === values.phone_number)
            if(values.password !== values.confirm_password){
                message.error("Passwords dont match")
            }
            if(values.password.length < 6){
                message.error("Password must be more than 6 characters")
            }
            if(existNumber){
                message.error("Phone number already in use")
            }
            else{
                dispatch(createUserByPhone(values.FirstName, values.LastName, values.phone_number, values.password));
                    history('/login');
                            message.success("SignUp successfull"); 
            }

        }  else{
            message.error("email signup")
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
        const [inputRule, setInputRule] = useState({
            required:true,
            Emessage:"Email is required",
            Pmessage:"Phone Number is Invalid",
            passMessage:"Password is required",
            CPmessage:"Confirm Password is required"
        })
  return (
    <div className='login'>
    <div className="loginContainer">
        <div className="header" style={{height: '60%', borderBottomRightRadius: '40%'}}>
            <h1>Welcom </h1> 
            <h2>Create an account</h2>
        </div>
        <div className="loginTypeSwitch">
            <Switch onChange={switchHanlder} /> <label htmlFor="">SignUp With Phone Number</label>
        </div>
        <div className="loginForm">

   

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
                            <Input type='text' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
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
                            <p>SignUp </p>
                    </Button>
                    <br />
                    Or <Link to='/login'>have account! Login here?</Link>
                </Form.Item>
            </Form>
            
        </div>
    </div>
</div>
  )
}
