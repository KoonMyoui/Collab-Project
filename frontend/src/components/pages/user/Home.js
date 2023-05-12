import React from 'react'

import { Card, Row, Col, Space } from 'antd';

const Home = () => {

  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <h2 style={{textAlign:'center'}}>User Home</h2>
        </Col>
      </Row>

      <Row>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: 'flex',
          // justifyContent: 'center',
          // width: '100%'
        }}
        >
          
        <Card title="Card Post">
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            Content
          </Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
        </Card>

        <Card title="Card" size="small">
        <p>Card content</p>
        <p>Card content</p>
        </Card>


        </Space>
      </Row>
        
    </div>
  )
}

export default Home