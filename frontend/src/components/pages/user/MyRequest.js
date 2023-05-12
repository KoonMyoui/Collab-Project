import React, { useState, useEffect } from 'react'

import { useSelector } from "react-redux";
import { getAllMeRequest, acceptRequested } from '../../functions/teamRequest';
import { Col, Row , Card, Button, Space} from 'antd';


const MyRequest = () => {
    const [data, setData] = useState([]);
    const [accept, setAccept] = useState(false)
    
    const user = useSelector((state) => state.userStore)
    const token = user.payload.token
    const uid = user.payload.id
    
    useEffect(()=>{
        loadData()
    }, []);
    
    const loadData = () => {
        getAllMeRequest(uid,token)
        .then(res => {
          setData(res.data)
    
        }).catch(err =>{
            console.log(err.response)
        })
    }
    // console.log(data)
    // console.log('#uid :',uid, token)

    const handleRequest = (value, token) => {
      acceptRequested(value, token)
      .then(res => {
        console.log(res)
        loadData()
      })
      .catch(err => {
        console.log(err)
      })
    }

    const handleAccept = (value) => {
        // setAccept(true)
        console.log(`accept ${accept}`, 'value',value)
        handleRequest(value, token)

    };

    const handleCancel = (value) => {
        // setIsModalOpen(false);
        console.log("denied", accept, `value ${value}`)
        // acceptRequested(value, token)
        // .then(res => {
        //   console.log(res)
        // })
        // .catch(err => {
        //   console.log(err)
        // })

        handleRequest(value, token)
    };


  return (
    <div>
        <Row>
          {data.map((item, index) => 

              <Card
              hoverable
              size="small"
              title= <p key={index}>โครงงาน :{item.projectID.title}</p>
            //   extra={<Link to={"/detail/"+ item._id} key={index} >More</Link>}
              style={{
                width: 500,
              }}
              >
              <p key={index}>ผู้ใช้ : {item.senderID.username} สนใจร่วมงานกับคุณ</p>
              <Space wrap>
                <Button type="primary" onClick={e =>handleAccept({
                  accept: true,
                  senderID: item.senderID._id,
                  projectID: item.projectID._id
                })} 
                >Accept
                </Button>

                <Button type="primary" danger onClick={e => handleCancel({
                  accept: false,
                  senderID: item.senderID._id,
                  projectID: item.projectID._id
                })}>Denied</Button>
                
              </Space>
              </Card>
          )}
          {!data && (
            <h1>No Request</h1>
          )}
        </Row>
    </div>
  )
}

export default MyRequest