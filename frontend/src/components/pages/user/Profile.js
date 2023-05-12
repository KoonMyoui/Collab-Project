import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from "react-redux";
import SkillTag from './SkillTag';

import { updateProfile, createProfile } from '../../functions/profile'
import { update_skills, update_about_me } from '../../reducers/profileSlice';

import { Col, Row, Avatar, Typography, 
  Divider, 
  Button
} from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const skillsData = [
  { title: 'React', percent: 80 },
  { title: 'JavaScript', percent: 90 },
  { title: 'HTML', percent: 95 },
  { title: 'CSS', percent: 85 },
  { title: 'Node.js', percent: 70 },
];

const Profile = () => {
  const skillsData = useSelector(state => state.skillsData);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userStore)
  const token = user.payload.token
  const uid = user.payload.id

  const [loading, setloading] = useState(true);
  const [data, setData] = useState()

  useEffect(()=>{
    
    loadData()
  }, [dispatch]);

  const loadData = () => {
    createProfile(uid,token)
    .then(res => {
      setloading(false)
      console.log(res.data.status)
      setData(res.data.data)
      dispatch(update_skills({
        payload: res.data.data
      }))

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
              <Avatar size={64} icon={<UserOutlined />} />
              <div style={{ marginLeft: '1rem' }}>
                <Title level={3}>John Doe</Title>
                <Paragraph>Full Stack Developer</Paragraph>
              </div>
            </div>
            <Button type="primary" size="small">Edit Profile</Button>
          </div>
          <Divider />
          <div >

            <SkillTag />

          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Profile