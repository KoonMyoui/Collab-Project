import React from 'react'
import { Col, Row } from 'antd';
import MenubarAdmin from '../../layouts/MenubarAdmin'

const Home = () => {
  return (
    <div>
      <Row>
        <Col flex="256px" >
            <br/>
          <MenubarAdmin/>
          
        </Col>
        <Col flex="auto" >
            <h2>Addmin Home Page</h2>
        </Col>
      </Row>
      
        
    </div>
  )
}

export default Home