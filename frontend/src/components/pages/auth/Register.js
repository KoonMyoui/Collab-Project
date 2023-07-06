import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Space, Typography  } from 'antd';

import { register } from '../../functions/auth'

const Register = () => {

  const navigate = useNavigate()

  const [value, setValue] = useState({
    username:"",
    password:"",
    password1:""
  })

  const { Title } = Typography;

  const onFinish = (values) => {
    console.log('Success:', values);
    goRegister(values)
    
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (e) => {
    setValue({...value, [e.target.name]:e.target.value})
  }

  console.log(value)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(value)
    if(value.password !== value.password1){
      alert("Password not match")
    }else{
      register(value)
      .then(res => {
        console.log(res.data)
        alert(res.data)
      })
      .catch((err) => {
        console.log(err.response.data)
        alert(err.response.data)
      })
    }
  }

  const goRegister = (values) => {
    register(values)
    .then(res => {
      console.log(res.data)
      alert(res.data)
      navigate("/login")
    })
    .catch((err) => {
      console.log(err.response.data)
      alert(err.response.data)
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
          <label>Confirm Password</label>
          <input type="password" name="password1" onChange={handleChange}/>
          <br/><br/>
          <button disabled={value.password.length < 8}>submit</button>
        </form> */}

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
          <div style={{ width: 400, padding: 24, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: 8 }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 24 ,marginTop: 14}}>Register</Title>

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
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      type: 'string',
                      min: 8,
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                style={{ display: 'flex', justifyContent: 'end' }}
                  // wrapperCol={{
                  //   offset: 8,
                  //   span: 16,
                  // }}
                >
                <Space wrap size={'large'}>
                  <Button type="primary" htmlType="submit" style={{ backgroundColor: 'green' }}>
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Form>

          </div>
        </div>

        {/* <div style={{display:'flex', justifyContent: 'center'}}>
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
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    type: 'string',
                    min: 8,
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
              <Space wrap size={'large'}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>

              </Space>
            </Form.Item>
          </Form>
        </div> */}
    </div>

  )
}

export default Register
//rafce