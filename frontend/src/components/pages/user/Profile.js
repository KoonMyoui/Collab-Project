import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from "react-redux";
import SkillTag from './SkillTag';

import { createProfile } from '../../functions/profile'
import { update_skills} from '../../reducers/profileSlice';

import { Col, Row, Avatar, Typography, 
  Divider, 
  Button
} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userStore)
  const token = user.payload.token
  const uid = user.payload.id

  const [loading, setloading] = useState(true);

  useEffect(()=>{
    
    loadData()
  }, [dispatch]);

  const loadData = () => {
    // prevent default
    createProfile(uid,token)
    .then(res => {
      
      console.log("fetch profile",res.data.status)
      // setData(res.data.data)
      dispatch(update_skills({
        payload: res.data.data
      }))

      setloading(false)

    }).catch(err =>{
        console.log(err.response)
    })
  }

  return (
    <div>
      <Row className='profile'>
        <Col span={12} offset={6}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {user.payload.pic ? 
              (
              // <Avatar size={64} src={user.payload.pic} />
              <Avatar size={64}>{user.payload.username}</Avatar>
              ) : 
              (
                <Avatar size={64} icon={ <UserOutlined />} />
              )}
              <div style={{ marginLeft: '1rem' }}>
                <Title level={3}>{user.payload.username}</Title>
                <Paragraph>edit profile for fun</Paragraph>
              </div>
            </div>
            {/* <Button type="primary" size="small">Edit Profile</Button> */}
          </div>
          <Divider />
          <div >

            {!loading && (
              <SkillTag />
            )}

          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Profile