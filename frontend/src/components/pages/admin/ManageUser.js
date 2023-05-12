import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import moment from "moment/min/moment-with-locales"

import { Col, Row , Table, Switch ,Space, Select, Tag, Modal} from 'antd';
import { EditOutlined , DeleteOutlined } from '@ant-design/icons';

import MenubarAdmin from '../../layouts/MenubarAdmin'
import { listUser, changeRole, changeStatus , removeUser, editUser} from '../../functions/users';

const ManageUser = () => {
  const user = useSelector((state) => state.userStore)
  const [userData, setUserData] = useState([]);
  const [loading, setloading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState({
    id: "",
    username: "",
    password: ""
  })


  const showModal = (uid) => {
    setIsModalOpen(true);
    setUpdate({
      ...update, id: uid
    })
  };
  const handleOk = () => {
    setIsModalOpen(false);
    console.log(update)
    editUser(user.payload.token, update.id, update)
    .then(res => {
      console.log(res)
      loadData(user.payload.token)
    }).catch(err =>{
      console.log(err.response)
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
      loadData(user.payload.token)
  }, []);

  const loadData = (authtoken) => {
      listUser(authtoken)
      .then(res => {
        setloading(false)
        setUserData(res.data)

      }).catch(err =>{
          console.log(err.response)
      })
  }

  const handleChangePassword = (e) => {
    console.log(e.target.value)
    console.log(e.target.name)
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handleChangeRole = (e, uid) => {
    const token = user.payload.token
    let values = {
      id: uid,
      role: e,
    };
    console.log('C Role',values)
    // changeRole(token, values)
    //   .then((res) => {
    //     console.log(res);
    //     loadData(token);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
  };

  const handleSwitchChange = (e, uid) => {
    const token = user.payload.token
    const value = {
      id:uid,
      enabled:e
    }
    console.log('switchhhh',value)
    changeStatus(token,value)
    .then(res=>{
      console.log(res)
      loadData(token)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const handleRemove = (id) => {
    const token = user.payload.token
    if (window.confirm("Are You Sure Delete!!")) {
      removeUser(token, id)
        .then((res) => {
          console.log(res);
          loadData(token);
        })
        .catch((err) => {
          console.log(err.response);
        });
      console.log("remove ",id)
    }
  };


//data for table
  const data = loading ? [] : userData.map((item ,index) => ({
    key: index,
    uid: item._id,
    username: item.username,
    role: item.role,
    status: item.enabled,
    created: item.createdAt,
    updated: item.updatedAt
  }))
//tag

const options = [
  {
    value: 'admin',
  },
  {
    value: 'user',
  }
];
//colums
const userColumns = [
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
    render: (e, record) => (
      <Select
      defaultValue={record.role}
      style={{width: 120,
      }}
      onChange={(e) => handleChangeRole(e, record.uid)}
      options={[
        {value: 'admin', label: <Tag color="green">admin</Tag>},
        {value: 'user', label: <Tag color="blue">user</Tag>}
      ]}
      />
    )
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: (e, record) => (
      < Switch 
      checked={record.status} 
      onChange={(e) => handleSwitchChange(e,record.uid)}
      />
    )
 
  },
  {
    title: 'created',
    dataIndex: 'created',
    key: 'created',
    render: (text) => moment(text).locale("th").format("ll")
  },
  {
    title: 'updated',
    dataIndex: 'updated',
    key: 'updated',
    render: (text) => moment(text).locale("th").startOf(text).fromNow()
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <EditOutlined style={{color: "black"}} onClick={() => showModal(record.uid)}/>
        <DeleteOutlined style={{ color: "red" }} onClick={()=> handleRemove(record.uid)}/> 
      </Space>
    ),
  },
];

  return (
    <div>
      <Row>
        <Col flex="256px" >
            <br/>
          <MenubarAdmin/>
          
        </Col>
        <Col flex="auto" >
            <h2>Addmin ManageUser Page</h2>
            <div>
              {loading ? ("loading") :
              (
                <Table 
                columns={userColumns} 
                dataSource={data}
                />
              )
              }
            </div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Edit user</p>

        <label>Username</label>
          <input type="text" name="username" onChange={handleChangePassword}/>
          <br/><br/>
          <label>Password</label>
          <input type="password" name="password" onChange={handleChangePassword}/>
      </Modal>
        </Col>
      </Row>
      
        
    </div>
  )
}

export default ManageUser