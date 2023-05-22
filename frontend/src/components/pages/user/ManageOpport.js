import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";

import { Col, Row , Table, Switch ,Space,  Button, Form, Input , Modal, Select} from 'antd';
import { EditOutlined , DeleteOutlined } from '@ant-design/icons';

import moment from "moment/min/moment-with-locales"

import { 
    getAllMeOpport,
    updateOpport,
    removeOpport,
    updateIsJoinOpport,
    updateStatusOpport
 } from '../../functions/opport'

const { TextArea } = Input;
const { Option } = Select;

const ManageOpport = () => {

    const user = useSelector((state) => state.userStore)
    const token = user.payload.token
    const uid = user.payload.id

    const [state, setstate] = useState([]);
    const [loading, setloading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [initFormData, setInitFormData] = useState()

    useEffect(()=>{
        form.resetFields();
        setInitFormData()
        loadData()
    }, []);
    
    console.log('all my oppo',state)
    
    const loadData = () => {
        getAllMeOpport(uid, token)
        .then(res => {
            setloading(false)
            setstate(res.data)
    
        }).catch(err =>{
            console.log(err.response)
        })
    }

    const showModal = (e,record) => {
        e.preventDefault();
        setIsModalOpen(true);
        console.log("pppppid",record);
        setInitFormData(record);
        
    };

    const handleCancel = (e) => {   
        // setInitFormData("");
        e.preventDefault();
        form.resetFields();
        // form.setFieldValue();
        setInitFormData("");
        console.log("init",initFormData);
        setIsModalOpen(false);
    };

    const handleRemove = (record) => {
        console.log("remove ",record)
        if (window.confirm("Are You Sure Delete!!")) {
            removeOpport(record.pid, token)
            .then((res) => {
              console.log(res);
              loadData();
            })
            .catch((err) => {
              console.log(err.response);
            });
        }
      };
    
    // form function
    const handleFormSubmit = (values) => {
        // Handle data update using the form values
        console.log('Form values:', values);
        console.log(initFormData.pid, initFormData.title, token);
        updateOpport(initFormData.pid, values, token)
        .then((res) => {
            console.log(res);
            loadData();
        })
        .catch((err) => {
            console.log(err.response);
        });
        setIsModalOpen(false);
      };
      
      const handleChangeIsJoin = (isJoin, pid) => {
        console.log('switchhhh',isJoin , pid)
        updateIsJoinOpport(pid, {isJoin}, token)
        .then(res=>{
            console.log(res)
            loadData()
        })
        .catch(err=>{
            console.log(err)
        })
      }

      const handleChangeStatus = (enabled, pid) => {
        console.log('switchhhh',enabled , pid)
        updateStatusOpport(pid, {enabled}, token)
        .then(res=>{
            console.log(res)
            loadData(token)
        })
        .catch(err=>{
            console.log(err)
        })
      }

    //data for table
    const data = loading ? [] : state.map((item ,index) => ({
        key: index,
        pid: item._id,
        title: item.title,
        description: item.description,
        collaborate: item.collaborate,
        category: item.category,
        status: item.enabled,
        isJoin: item.isJoin,
        created: item.createdAt,
        updated: item.updatedAt
    }))

    //colums
    const opportColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 250,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Collaborate',
            dataIndex: 'collaborate',
            key: 'collaborate',
            width: 250,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 250,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (e, record) => (
              < Switch 
              checked={record.status} 
              onChange={(enabled) => handleChangeStatus(enabled,record.pid)}
              />
            )
        },
        {
            title: 'join',
            dataIndex: 'join',
            key: 'join',
            render: (e, record) => (
              < Switch 
              checked={record.isJoin} 
              onChange={(isJoin) => handleChangeIsJoin(isJoin,record.pid)}
              />
            )
        },
        {
            title: 'created',
            dataIndex: 'created',
            key: 'created',
            sorter: (a, b) => moment(a.updated).valueOf() - moment(b.updated).valueOf(),
            render: (text) => moment(text).locale("th").format("ll")
        },
        {
            title: 'updated',
            dataIndex: 'updated',
            key: 'updated',
            sorter: (a, b) => moment(a.updated).valueOf() - moment(b.updated).valueOf(),
            render: (text) => moment(text).locale("th").startOf(text).fromNow()
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                <EditOutlined style={{color: "black"}} onClick={(e) => showModal(e,record)}/>
                <DeleteOutlined style={{ color: "red" }} onClick={()=> handleRemove(record)}/> 
                </Space>
            ),
        },
    ]

    //Form 
    const formLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    const initialValue = {
        title: 'jane'
    }
    
    const formFields = [
        {
            name: 'title',
            label: 'Title',
            rules: [{ required: true, message: 'Please enter a name' }],
        },{
            name: "description",
            label: "Description",
            rules: [{
                required: true,
                message: 'Please input your dsesc',
            }],
            type: 'textarea',
        },
        {
            name: 'collaborate',
            label: 'collaborate',
            rules: [{ required: true, message: 'Please enter a collab' }],
            type: 'selectCollab',
        },
        {
            name: 'category',
            label: 'category',
            rules: [{ required: true, message: 'Please enter a category' }],
            type: 'selectCategory',
        },
        
        // Add more form fields as needed
    ];

    const selectCollabOptions = [
        { value: 'Software engineer', label: 'Software engineer' },
        { value: 'Art', label: 'Art' },
        { value: 'Science', label: 'Science' },
        { value: 'Other', label: 'Other' },
        
    ];

    const selectCategoryOptions = [
        { value: 'Art', label: 'Art' },
        { value: 'Science', label: 'Science' },
        { value: 'other', label: 'other' },
    ];
    
  return (
    <div>
        <Row>
            <Col span={12} offset={6}>
            <div>
              {loading ? ("loading") :
                (
                    <Table 
                    columns={opportColumns} 
                    dataSource={data}
                    />
                )
              }
            </div>
            <Modal 
                title="Update Data" 
                open={isModalOpen} 
                onOk={() => form.submit()} 
                onCancel={(e)=>handleCancel(e)}
            >
                <Form
                    {...formLayout}
                    form={form}
                    onFinish={handleFormSubmit}
                    initialValues={initFormData}
                >
                    {formFields.map((field)=>(
                        <Form.Item
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            rules={field.rules}
                        >
                            {field.type === 'textarea' ? 
                            (
                                <TextArea rows={6} placeholder="Descrip some here"/>
                            ) : field.type === 'selectCollab' ? 
                            (
                                <Select allowClear>
                                    {selectCollabOptions.map((option) => (
                                        <Select.Option key={option.value} value={option.value}>
                                        {option.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            ) : field.type === 'selectCategory' ? (
                                <Select allowClear>
                                    {selectCategoryOptions.map((option) => (
                                        <Select.Option key={option.value} value={option.value}>
                                        {option.label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            ) :
                            (
                                <Input/>
                            )
                            }
                            
                        </Form.Item>
                    ))}

                </Form>
            </Modal>
            </Col>
        </Row>
    </div>
  )
}

export default ManageOpport