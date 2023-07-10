import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { Button, Form, Input, Select, Typography} from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';

import { createOpport } from '../../functions/opport';
import { createGroupChat } from '../../functions/chat'

const { TextArea } = Input;
const { Option } = Select;

const OpportForm = () => {
    const [opportFormDisabled, setOpportFormDisabled] = useState(true);

    const user = useSelector((state) => state.userStore)
    console.log('user',user)
    const token = user.payload.token

    const [form] = Form.useForm()
    const { Title } = Typography;
    const onFinish = (values) => {
        console.log('data:', values);

        createOpport(values, token)
        .then(res=>{
            console.log(res)
            createGroupChat(res.data.data, token)
            .then(res=>{
                console.log('create groupchat',res)
                alert('create project success')
                form.resetFields(); // Reset form fields
            })
          })
          .catch(err=>{
            console.log(err)
          })
      };
      
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

  return (
    <div>
        

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
            <div style={{ margin: '0 auto', width: 600, padding: 24, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', borderRadius: 8 }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 24 ,marginTop: 14}}>Create Project</Title>
            <Form
            form={form} 
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            // style={{
            // maxWidth: 600,
            // }}
            initialValues={{
            remember: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Title"
            name="title"
            rules={[
                {
                required: true,
                message: 'Please input your title',
                },
            ]}
            >
            <Input prefix={<EditOutlined />} placeholder="Title"/>
            </Form.Item>

            <Form.Item
            label="Description"
            name="description"
            rules={[
                {
                required: true,
                message: 'Please input your description',
                },
            ]}
            >

             <TextArea rows={6} placeholder="Descrip some here" />
            </Form.Item>

            <Form.Item
            label="Collab"
            name="collaborate"
            rules={[
                {
                required: true,
                message: 'Please select collaboration',
                },
            ]}
            >
            <Select
            placeholder="Looking for?"
            allowClear
            >
                <Option value="Software engineer">Software engineer</Option>
                <Option value="Art">Art</Option>
                <Option value="Science">Science</Option>
                <Option value="other">other</Option>
            </Select>

            </Form.Item>

            <Form.Item
            label="category"
            name="category"
            rules={[
                {
                required: true,
                message: 'Please select category',
                },
            ]}
            >
            
            <Select
            placeholder="Project category"
            allowClear
            >
                <Option value="Art">Art</Option>
                <Option value="Science">Science</Option>
                <Option value="other">other</Option>
            </Select>

            </Form.Item>
            
            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
            </Form>

            </div>
        </div>
    </div>
  )
}

export default OpportForm