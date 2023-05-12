import React, { useState, useEffect } from "react";
import { Menu, Badge, Space } from "antd";
import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  DownOutlined,
  FormOutlined,
  BellOutlined,
  MessageOutlined,
  UserOutlined 
} from "@ant-design/icons";
import io from 'socket.io-client'

// Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from '../reducers/userSlice';

const NewNavBar = () => {
  const { SubMenu } = Menu;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [current, setCurrent] = useState('home');
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  const user = useSelector((state) => state.userStore)
  const socket = io.connect("http://localhost:5000")
  console.log("user Navbar", user);

  useEffect(()=>{
    socket.on("recieve_notifications",(data)=>{
        // setMessageReceived(data.message)
        console.log(data);
        if (data){
          setShow(true)
        }
    })
  },[socket])

  const goLogout = () => {
    dispatch(logout({
        payload: null
      }));
    navigate("/");
  };

  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        {/* <a href="" ></a>*/}
        <Link to="/">หน้าแรก</Link>
      </Menu.Item>

      {user && (
        <>
          {/* {user.username} */}
        <Space size="large">
          <Badge count={count}>
            <Menu.Item key="message" icon={<MessageOutlined />}>
                <Link to="/newchat">ข้อความ</Link>
            </Menu.Item>
          </Badge>
        </Space>
        <Space size="large">
          <Badge dot={show}>
            <Menu.Item key="notification" icon={<BellOutlined />}>
                <Link to="#">แจ้งเตือน</Link>
            </Menu.Item>
          </Badge>
        </Space>

          <SubMenu
            style={{ textAlign: 'right' }}
            key="SubMenu"
            icon={<UserOutlined />}
            title={user.payload.username}
          >

            <Menu.Item 
            icon={<UserOutlined />}
            key="profile" >
              <Link to="/user/profile">โปรไฟล์</Link>
            </Menu.Item>

            <Menu.Item 
            icon={<UserOutlined />}
            key="myrequest" >
              <Link to="/user/my-request">คำขอเข้าร่วม</Link>
            </Menu.Item>

            <Menu.Item 
            icon={<FormOutlined />}
            key="post" >
              <Link to="/user/opport-form">สร้างโครงงาน</Link>
            </Menu.Item>

            <Menu.Item 
            icon={<LogoutOutlined />}
            key="logout" onClick={goLogout}>
              ออกจากระบบ
            </Menu.Item>

          </SubMenu>
        </>
      )}

      {!user && (
        <>
          <Menu.Item
            key="login"
            style={{ float: "right" }}
            icon={<LoginOutlined />}
          >
            {/* <a href="" ></a>*/}
            <Link to="/login">เข้าสู่ระบบ</Link>
          </Menu.Item>
        
          <Menu.Item
            style={{ float: 'right' }}
            key="register"
            icon={<UserAddOutlined />}
          >
            <Link to="/register">สมัครสมาชิก</Link>
          </Menu.Item>
        
        </>
      )}
    </Menu>
  );
};

export default NewNavBar;