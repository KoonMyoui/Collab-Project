import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useSelector } from "react-redux";
import { Col, Row , Divider, Button, Modal} from 'antd';
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

    const socket = io.connect("http://localhost:5000")
    const user = useSelector((state) => state.userStore)
    const token = user.payload.token

    useEffect(()=>{
        loadData(param.id)
        
    }, []);

    useEffect(()=>{
        setTeamRequested({
            sender_id: user.payload.id,
            project_id: param.id,
        })
        meRequested({
            sender_id: user.payload.id,
            project_id: param.id,
        },token)
        .then(res => {
            console.log(res.data)
            // setRequested(res.data)
        })
        .catch(err =>{
            console.log(err.response)
        })
    },[])
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
            <Col span={20}>
                <h1>Detail title {project.title} </h1>
            </Col>
        </Row>
        <Divider orientation="left">Percentage columns</Divider>
        <Row justify="center">
            <Col flex={3}>
                <h1> detail area</h1>
                {project.owner && (
                    <h2>{project.owner.username}</h2> 
                )}
                
            </Col>
            <Col flex={2}>
                <h1>Join area</h1>
                
                <Button type="primary" onClick={showModal}>
                    เข้าร่วม
                </Button>
                <Modal title="เข้าร่วมโปรเจค" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>หวังว่าจะได้สนุกกับเพื่อนใหม่ และโปรเจคแสนสนุก</p>
                    <p>เราจะส่งคำขอเข้าร่วมนี้ไปให้เจ้าของโปรเจค รอดูผลใน notification นะ</p>
                </Modal>
            </Col>
        </Row>
    </div>
  )
}

export default ProjectDetail