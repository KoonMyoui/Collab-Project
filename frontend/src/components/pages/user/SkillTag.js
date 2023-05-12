import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../functions/profile'
import { update_skills, update_about_me } from '../../reducers/profileSlice';

import { 
    Typography, 
    List,  
    Button, 
    Tooltip,
    Modal,
    Input, Space, Tag, theme,
    Select
  } from 'antd';

  import { PlusOutlined } from '@ant-design/icons';
  const { Title, Paragraph } = Typography;
  const { Option } = Select
  const { TextArea } = Input;
  
  const skillsOption = [
    { title: 'React', color: 'blue' },
    { title: 'JavaScript', color: 'purple' },
    { title: 'HTML', color: 'green' },
    { title: 'CSS', color: 'gold' },
    { title: 'Node.js', color: 'orange' },
  ];

const SkillTag = () => {

  const dispatch = useDispatch();
  const skillsData = useSelector((state) => state.profileStore);//profileStore

  const user = useSelector((state) => state.userStore)
  const user_token = user.payload.token
  const user_id = user.payload.id
  console.log(user_id)

  const [newSkill, setNewSkill] = useState([]);
  const [addSkillModalVisible, setAddSkillModalVisible] = useState(false);

  const [newAboutMeText, setNewAboutMeText] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [profileData, setProfileData] = useState()

  const handleAddSkill = () => {
    console.log(newSkill)
    console.log(skillsData)

    const value = { id: skillsData.payload._id, skills: newSkill}
    console.log(value)
    updateData(value)

    setAddSkillModalVisible(false);
    setNewSkill([]);

  };
  console.log(skillsData)

  const handleUpdateAboutMe = () => {
    const newAboutMeData = { id: skillsData.payload._id, text: newAboutMeText};
    updateData(newAboutMeData)
    console.log(newAboutMeText)
    // dispatch(update_about_me({payload: newAboutMeData}));
    // setNewAboutMeText('');
    setEditModalVisible(false);
    };

    const updateData = (value) => {
      console.log(value)
      updateProfile(value.id, value, user_token)
      .then(res => {
        console.log(res.data)
        dispatch(update_skills({
          payload: res.data.data
        }))
      }).catch(err =>{
          console.log(err.response)
      })
    }
    
    useEffect(()=>{
      
    },[])
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
            <Title level={4}>Personal Skills</Title>
            {skillsData && (
              <List
              itemLayout="horizontal"
              dataSource={skillsData.payload.skills}
              renderItem={(item) => (
                  <List.Item>
                  <div style={{ flex: 1 }}>
                      <Tag>
                        {item}
                      </Tag>
                  </div>
                  </List.Item>
              )}
              />
            )}

            {skillsData && (skillsData.payload.owner === user_id) && (

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                <Tooltip title="เพิ่มสกิล">
                  <Button
                    type="dashed" 
                    shape="circle" 
                    icon={<PlusOutlined />} 
                    onClick={() => setAddSkillModalVisible(true)}
                  />
                </Tooltip>
              </div>
            )}

              <Modal
                open={addSkillModalVisible}
                title="Add Skill"
                onCancel={() => setAddSkillModalVisible(false)}
                onOk={handleAddSkill}
              >
                <div>

                  <div style={{ marginBottom: 8 }}>
                    {/* <label htmlFor="skill-color">Color:</label> */}
                    {skillsData && (
                      <Select
                        // id="skill-color"
                        mode='tags'
                        style={{ width: '100%' }}
                        // value={newSkill}
                        onChange={(value) => setNewSkill(value)}
                        // placeholder= "Enter Skill"
                        defaultValue={skillsData.payload.skills}
                      >
                    
                        {skillsOption.map((item , index) => (
                          <Option key={index} value={item.title}>
                            {item.title}
                          </Option>
                        ))}

                    </Select>
                    )}
                    
                  </div>
                </div>
              </Modal>

        </div>
{/* about Me */}

        <div style={{ flex: 1, marginLeft: '2rem' }}>
            <Title level={4}>About Me</Title>

            {skillsData ? (
              <Paragraph>
              Lorem ipsum dolor sit amet, {skillsData.payload.aboutMe}
              </Paragraph>
            ): (
              <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              tempor euismod ipsum, ac bibendum quam ultrices vel. Fusce
              vestibulum tincidunt massa, eu vehicula quam imperdiet in.
              </Paragraph>
            )}

            {skillsData && (skillsData.payload.owner === user_id) && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                <Tooltip title="เพิ่ม">
                    <Button
                      type="dashed" 
                      shape="circle" 
                      icon={<PlusOutlined />} 
                      onClick={() => setEditModalVisible(true)}
                    />
                </Tooltip>
              </div>
            )}
            
              <Modal title="Edit About Me" 
              open={editModalVisible} 
              onCancel={() => setEditModalVisible(false)} 
              onOk={handleUpdateAboutMe}>
                {skillsData.payload.aboutMe ? (
                  <TextArea 
                  rows={4}
                  defaultValue={skillsData.payload.aboutMe}
                  onChange={e=>setNewAboutMeText(e.target.value)}
                  />
                ) : (
                  <TextArea 
                  rows={4}
                  onChange={e=>setNewAboutMeText(e.target.value)}
                  />

                )} 
                  

              </Modal>
           
        </div>
    </div>
  )
}

export default SkillTag