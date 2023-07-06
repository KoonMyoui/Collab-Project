import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useSelector } from "react-redux";
import { Col, Row , Divider, Button, Modal,
    Typography, Card, Avatar, Tag, Descriptions} from 'antd';

import io from 'socket.io-client'

import { getOneOpport } from '../../functions/opport';
import { 
    createTeamRequest,
    meRequested
} from '../../functions/teamRequest';

const ProjectDetail = () => {
    const param = useParams()
    const [loading, setloading] = useState(true);
    const [requested, setRequested] = useState(false);
    const [project, setProject] = useState({});
    const [teamRequest, setTeamRequest] = useState({});
    const [teamRequested, setTeamRequested] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [token, setToken] = useState();

    const socket = io.connect("http://localhost:5000")
    const user = useSelector((state) => state.userStore)
    // const token = user.payload.token
    // if (user){
    //     setToken(user.payload.token)
    // }

    const { Title, Text } = Typography;

    useEffect(()=>{
        loadData(param.id)
        
    }, []);

    useEffect(() => {
        if (user && !token) {
          setToken(user.payload.token);
        }
      }, [user, token]);
      

    // useEffect(()=>{
    //     setTeamRequested({
    //         sender_id: user.payload.id,
    //         project_id: param.id,
    //     })
    //     meRequested({
    //         sender_id: user.payload.id,
    //         project_id: param.id,
    //     },token)
    //     .then(res => {
    //         console.log(res.data)
    //         // setRequested(res.data)
    //     })
    //     .catch(err =>{
    //         console.log(err.response)
    //     })
    // },[])

    console.log(requested)

    const loadData = (id) => {
        getOneOpport(id)
        .then(res => {
          setloading(false)
          setProject(res.data)
          console.log(res.data)
  
        }).catch(err =>{
            console.log(err.response)
        })
    }

    const showModal = () => {
        setIsModalOpen(true);
        setTeamRequest({
            sender_id: user.payload.id,
            project_id: param.id,
            owner_id: project.owner
          })
      };

    const handleOk = () => {
        setIsModalOpen(false);
        console.log('teammmm##',teamRequest)
        createTeamRequest(teamRequest, token)
        .then(res=>{
            console.log(res)
          })
        .catch(err=>{
        console.log(err)
        })

        // socket.emit("send_notifications",{
        //     sender: {
        //         id: user.payload.id,
        //         username: user.payload.username
        //     },
        //     project_id: param.id,
        //     owner_id: project.owner
        // })

        console.log("send join")
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

  return (
    <div>
        <Row justify="center">
            <Col span={20} style={{marginTop: '24px', marginBottom: '15px'}}>
                {project && (
                    <Title level={2}>{project.title}</Title>
                )}
            </Col>
        </Row>
        <Divider/>
        {/* <Row justify="center">
            <Col flex={3}>
                <Title level={3}>detail area</Title>
                <Divider />
                {project.owner && (
                    <div>
                        <h2>{project.owner.username}</h2>
                        <Divider />
                        <Text>{project.description}</Text>
                    </div>
                )}
                
            </Col>
            <Col flex={2}>
                {!user && <Title level={5}>ล็อกอินก่อน เพื่อขอเข้าร่วมโครงงานนะ</Title>}
                
                {user && (
                    // <div>
                    //     <h1>Join area</h1>
                    //     <Button type="primary" onClick={showModal}>
                    //         เข้าร่วม
                    //     </Button>
                    //     <Modal title="เข้าร่วมโปรเจค" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    //         <p>หวังว่าจะได้สนุกกับเพื่อนใหม่ และโปรเจคแสนสนุก</p>
                    //         <p>เราจะส่งคำขอเข้าร่วมนี้ไปให้เจ้าของโปรเจค รอดูผลใน notification นะ</p>
                    //     </Modal>
                    // </div>

                    <div>
                        <Card>
                        <div>
                            <Avatar size={64} src="avatar-image-url" />
                            <Title level={3}>Profile Name</Title>
                            <Tag color="blue">Tag 1</Tag>
                            <Tag color="green">Tag 2</Tag>
                        </div>
                        <Divider />
                        <div>
                            <Descriptions title="About">
                            <Descriptions.Item label="Location">Location information</Descriptions.Item>
                            <Descriptions.Item label="Role">Role information</Descriptions.Item>
                            <Descriptions.Item label="Industry">Industry information</Descriptions.Item>
                            </Descriptions>
                        </div>
                        <Divider />
                        <div>
                            <Text>Profile description or project overview</Text>
                        </div>
                        <Divider />
                        <div>
                        <h1>Join area</h1>
                            <Button type="primary" onClick={showModal}>
                                เข้าร่วม
                            </Button>
                            <Modal title="เข้าร่วมโปรเจค" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                <p>หวังว่าจะได้สนุกกับเพื่อนใหม่ และโปรเจคแสนสนุก</p>
                                <p>เราจะส่งคำขอเข้าร่วมนี้ไปให้เจ้าของโปรเจค รอดูผลใน notification นะ</p>
                            </Modal>
                        </div>
                        </Card>
                    </div>
                    
                )}
            </Col>
        </Row> */}
        

        <div>
            <Row gutter={16}>
                <Col span={16}>
                    <Card>
                        <div>
                            {project.owner && (
                                <div>
                                    <h2>{project.owner.username}</h2>
                                    {/* <Divider /> */}
                                    <Text>category </Text> 
                                        <Tag color="pink"> 
                                            {project.category} 
                                        </Tag>

                                        <Text>looking for </Text>   
                                        <Tag color="pink"> 
                                            {project.collaborate}
                                        </Tag>
                                    <Divider />
                                        <Text>{project.description}</Text>
                                </div>
                            )}
                        {/* <Title level={3}>Project Title</Title>
                        <Divider />
                        <Text>Project description</Text> */}
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    {user && project.owner ? (                    
                        <Card>
                            <div>
                                <Avatar size={64} src={project.owner.pic}/>
                                <Title level={3}>{project.owner.username}</Title>
                                {/* <Avatar size={64} src="avatar-image-url"/>
                                <Title level={3}>user name</Title> */}
                                <Tag color="blue">Python</Tag>
                                <Tag color="green">Java</Tag>
                            </div>
                            <Divider />
                            <div>
                                <Descriptions title="About">
                                    <Descriptions.Item >my information</Descriptions.Item>
                                </Descriptions>
                            </div>
                            <Divider />
                            <div>
                                <Button type="primary" onClick={showModal}>
                                    เข้าร่วม
                                </Button>
                                <Modal title="เข้าร่วมโปรเจค" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <p>หวังว่าจะได้สนุกกับเพื่อนใหม่ และโปรเจคแสนสนุก</p>
                                    <p>เราจะส่งคำขอเข้าร่วมนี้ไปให้เจ้าของโปรเจค รอดูผลใน notification นะ</p>
                                </Modal>
                            </div>
                        </Card>
                    ) : (
                        <Card>
                            <Title level={4}>ล็อกอินก่อนเพื่อขอเข้าร่วมนะ</Title>
                        </Card>
                    )}
                </Col>
            </Row>
        </div>

    </div>
  )
}

export default ProjectDetail