import React, { useEffect , useState} from 'react'
import { useSelector } from "react-redux";
import { getAllMeSentRequest, removeRequested } from '../../functions/teamRequest'

import { Col, Row , Card, Button, Space, Typography} from 'antd';
const { Title } = Typography;

const SentRequest = () => {

    const [data, setData] = useState([]);
    
    const user = useSelector((state) => state.userStore)
    const token = user.payload.token
    const uid = user.payload.id

    useEffect(()=>{
        loadData()
    }, []);
    
    const loadData = () => {
        getAllMeSentRequest(uid,token)
        .then(res => {
            console.log('my sent ',res)
          setData(res.data)
    
        }).catch(err =>{
            console.log(err.response)
        })
    }

    const handleAccept = (value) => {
        console.log(value)
        const id = value
        removeRequested(id, token)
        .then(res =>{
            console.log(res)
            loadData()
        }).catch(err => {
            console.log(err.response)
        })

    };

  return (
    <div>

        <Space
                direction="vertical"
                size="middle"
                style={{
                  display: 'flex',
                }}
              >
                {data && data.map((item, index) => 
                  <Card
                    hoverable
                    size="small"
                    title= <p key={index}>โครงงาน :{item.projectID.title}</p>
                    //   extra={<Link to={"/detail/"+ item._id} key={index} >More</Link>}
                    style={{
                      width: 500,
                    }}
                    >
                    <p key={index}>เจ้าของ : {item.ownerID.username} </p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <Space wrap>
                            <Button type="primary" danger onClick={e =>handleAccept(item._id)} 
                            >ยกเลิกคำขอ
                            </Button>
                        </Space>
                    </div>
                  </Card>
                )}
              </Space>

              {data.length === 0 && (
                <Title level={2}>No Sent Request</Title>
             )}

    </div>
  )
}

export default SentRequest