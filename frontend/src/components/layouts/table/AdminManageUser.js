import React,{ useState, useEffect }from 'react'
import { useSelector } from 'react-redux'

import { Space, Switch } from 'antd';
import { EditOutlined , DeleteOutlined } from '@ant-design/icons';

import { changeRole } from '../../functions/users';

export const userColumns = [
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username',
    width: 250,
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: (e, record) => (< Switch checked={record} onChange={() => handleSwitchChange(e,record.uid)}/>)
 
  },
  {
    title: 'created',
    dataIndex: 'created',
    key: 'created',
  },
  {
    title: 'updated',
    dataIndex: 'updated',
    key: 'updated',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <EditOutlined style={{color: "black"}}/>
        <DeleteOutlined style={{ color: "red" }}/> 
      </Space>
    ),
  },
];

const handleSwitchChange = (e,uid) => {
  const value = {
    id:uid,
    enabled:e
  }
  console.log('switchhhh',value)

  // changeRole(user.payload.token,value)
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log(err)
  })
}
