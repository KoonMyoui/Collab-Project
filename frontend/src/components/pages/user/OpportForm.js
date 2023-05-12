import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { Button, Form, Input , Select, Checkbox} from 'antd';

import { createOpport } from '../../functions/opport';
import { createGroupChat } from '../../functions/chat'

const { TextArea } = Input;
const { Option } = Select;

const OpportForm = () => {
    const [opportFormDisabled, setOpportFormDisabled] = useState(true);

    const user = useSelector((state) => state.userStore)
    console.log('user',user)
    const token = user.payload.token

    const onFinish = (values) => {
        console.log('data:', values);

        createOpport(values, token)
        .then(res=>{
            console.log(res)
            createGroupChat(res.data.data, token)
            .then(res=>{
                console.log('create groupchat',res)
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
            label="Title"
            name="title"
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
            label="Description"
            name="description"
            rules={[
                {
                required: true,
                message: 'Please input your dsesc',
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
                message: 'Please input your colab',
                },
            ]}
            >
            <Select
            placeholder="you looking for?"
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
                message: 'Please input your colab',
                },
            ]}
            >
            
            <Select
            placeholder="kind of Opportunity"
            allowClear
            >
                <Option value="Art">Art</Option>
                <Option value="Science">Science</Option>
                <Option value="other">other</Option>
            </Select>

            </Form.Item>

            {/* <Checkbox
                    checked={opportFormDisabled}
                    onChange={(e) => setOpportFormDisabled(e.target.checked)}
                >
                    สร้างแชทสำหรับโปรเจคนี้หรือไม่
            </Checkbox>
            <Form.Item
                label="Chat name"
                name="chatName"
                rules={[
                    {
                    required: opportFormDisabled,
                    message: 'Please input your chat name',
                    },
                ]}
                hidden={!opportFormDisabled}>
                    <Input />
            </Form.Item> */}
            
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

        {/* <Checkbox
        checked={opportFormDisabled}
        onChange={(e) => setOpportFormDisabled(e.target.checked)}
      >
        สร้างแชทสำหรับโปรเจคนี้หรือไม่
      </Checkbox>
      <Form.Item
      label="Chat name"
      name="chatName"
      rules={[
          {
          required: true,
          message: 'Please input your colab',
          },
      ]}
      hidden={!opportFormDisabled}>
        <Input />
      </Form.Item> */}
    </div>
  )
}

export default OpportForm