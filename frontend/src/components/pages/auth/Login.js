import React, {useState} from 'react'
import { loginAuth } from '../../functions/auth'

import { Button, Checkbox, Form, Input, Space, Typography, message } from 'antd';

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login } from '../../reducers/userSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [value, setValue] = useState({
    username:"",
    password:""
  })
  
  const roleBaseRedirect = (role) => {
    console.log(role);
    if (role === "admin") {
      navigate("/admin/index");
    } else {
      // navigate("/user/index");
      navigate("/");
    }
  };

  const { Title } = Typography;

  //ant
  const onFinish = (values) => {
    console.log('Success:', values);
    goLogin(values)
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onRegister = () =>{
    navigate("/register")
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Login success',
    });
  };

  const error = (err) => {
    messageApi.open({
      type: 'error',
      content: err,
    });
  };

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    });
  };
  //handle
  const handleChange = (e) => {
    setValue({...value, [e.target.name]:e.target.value})
  }
  
  const handleSubmit = (e) => {
    // e.preventDefault()
    console.log(value)

    loginAuth(value)
    .then(res => {
      console.log(res.data)
      alert('Login success')
      dispatch(login({
        payload:{
          // id: res.data.payload.user._id,
          token: res.data.token,
          username: res.data.payload.user.username,
          role: res.data.payload.user.role
        }
      }));
      localStorage.setItem('token',res.data.token)
      roleBaseRedirect(res.data.payload.user.role)
    })
    .catch((err) => {
      console.log(err.response.data)
      alert(err.response.data)
    })
    
  }

  const goLogin = (val) =>{
    loginAuth(val)
    .then(res => {
      console.log(res.data)
      alert('Login success')
      // success()
      dispatch(login({
        payload:{
          token: res.data.token,
          username: res.data.payload.user.username,
          role: res.data.payload.user.role
        }
      }));
      localStorage.setItem('token',res.data.token)
      roleBaseRedirect(res.data.payload.user.role)
    })
    .catch((err) => {
      console.log(err.response.data)
      alert(err.response.data)
      // error(err.response.data)
    })
  }

  return (
    <div>
        
        {/* <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" name="username" onChange={handleChange}/>
          <br/><br/>
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange}/>
          <br/><br/>
          <button disabled={value.password.length < 8}>submit</button>
        </form> */}

      {/* <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col>
          
          <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Login to Collab Area</Title>
          <Space align="center">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
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
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
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
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
              <Space wrap size={'large'}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>

                <Button htmlType="button" onClick={onRegister}>
                  Register
                </Button>
              </Space>
            </Form.Item>
          </Form>
          </Space>
        </Col>
      </Row> */}

      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ width: 400, padding: 24, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: 8 }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 ,marginTop: 14}}>Login</Title>
        
        <Space align="center">
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
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
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
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
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
              <Space wrap size={'large'}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>

                <Button htmlType="button" onClick={onRegister}>
                  Register
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </div>


    </div>
  )
}

export default Login