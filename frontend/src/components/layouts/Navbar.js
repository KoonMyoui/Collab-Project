import React, {useState} from 'react'
import { useSelector } from 'react-redux'

import { AppstoreOutlined, 
  MailOutlined ,
  MessageOutlined ,
  FormOutlined,
  HomeOutlined,
  BellOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
//redux
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userSlice';
//router
import { Link, useNavigate } from 'react-router-dom';

const items = [
    {
      label: (
        <Link to="/">Home</Link>
      ),
      key: 'home',
      icon: <HomeOutlined />,
      disabled: false,
    },
    {
      label: (
        <Link to="/login" >Login</Link>
      ),
      key: 'login',
      icon: <MailOutlined />,
      
    },
    {
      label: (
        <Link to="/register">Register</Link>
      ),
      key: 'register',
      icon: <AppstoreOutlined />,
      disabled: false,
    },
    {
      label: (
        <Link to="/user/opport-form">Post</Link>
      ),
      key: 'post',
      icon: <FormOutlined />,
      disabled: false,
    },
    {
      label: (''),
      key: 'notification',
      icon: <BellOutlined />,
      
    },
    {
      
      key: 'message',
      icon: <MessageOutlined />,
    },
    {
      label: (
        'Logout'
      ),
      key: 'logout',
      icon: <AppstoreOutlined />,
      disabled: false,
    },
    {
      label: (
        'Menu'
      ),
      key: 'menu',
      icon: <AppstoreOutlined />,
      disabled: false,
      children: [
        {
          label: 'Profile',
          key: 'sub1'
        },
        {
          label: 'My Project',
          key: 'sub2'
        },
        {
          label: 'sub 3',
          key: 'sub3'
        },
      ]
    },
  ];

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [current, setCurrent] = useState('home');

    const onClick = (e) => {
      console.log('click ', e);
      setCurrent(e.key);

      if (e.key === 'logout'){
        console.log('hello logout')
        dispatch(logout({
          payload: null
        }));
        setCurrent('home')
        navigate("/");
      }
    };

  return <div>
        <Menu 
      onClick={onClick} 
      selectedKeys={[current]} 
      mode="horizontal" 
      items={items} 
      />
     
  </div>
}

export default Navbar