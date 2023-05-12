import React from 'react'
import { Link } from 'react-router-dom';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
    getItem('Navigation Two', 'sub2', <MailOutlined />, [
      getItem(<Link to="/admin/index">'Option 5'</Link>, '5'),
      getItem(<Link to="/admin/manage-user">'Manage User'</Link>, '6'),
    ]),
    {
      type: 'divider',
    },
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
  ];

const MenubarAdmin = () => {
    const onClick = (e) => {
        console.log('click ', e);
      };
      
  return (
     <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['5']}
      defaultOpenKeys={['sub2']}
      mode="inline"
      items={items}
    />
  )
}

export default MenubarAdmin