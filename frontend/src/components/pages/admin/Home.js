import React from 'react'
import { Col, Row, Typography  } from 'antd';
import MenubarAdmin from '../../layouts/MenubarAdmin'

const Home = () => {
  const { Title } = Typography;
  return (
    <div>
      <Row>
        <Col flex="256px" >
            <br/>
          <MenubarAdmin/>
          
        </Col>
        <Col flex="auto" >
            <Title level={2} style={{ textAlign: 'center', marginBottom: 24 ,marginTop: 14}}>Addmin Home</Title>
        </Col>
      </Row>
      
        
    </div>
  )
}

export default Home