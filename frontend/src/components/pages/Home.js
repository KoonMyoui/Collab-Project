import React, { useState, useEffect } from 'react'
import { getAllOpport } from '../functions/opport';
import { Link } from 'react-router-dom';
import { Col, Row , Avatar, Card, Skeleton, List} from 'antd';

const { Meta } = Card;

const Home = () => {
  const [loading, setloading] = useState(true);
  const [state, setstate] = useState([]);

  useEffect(()=>{
    loadData()
}, []);

console.log('all oppo',state)

const loadData = () => {

    getAllOpport()
    .then(res => {

      setloading(false)
      setstate(res.data)

    }).catch(err =>{
        console.log(err.response)
    })
}

const onClickCard = () =>{
console.log("AA")
}

  return (
    <div>
        <Row>
          <Col>
            <h1>Home page</h1>
          </Col>
        </Row>
        <Row>
          {/* {state.map((item, index) => 

              <Card
              hoverable
              size="small"
              title= <p key={index}>{item.title}</p>
              extra={<Link to={"/detail/"+ item._id} key={index} >More</Link>}
              style={{
                width: 300,
              }}
              >
              <p key={index}>description : {item.description}</p>
              <p key={index}>looking for : {item.collaborate}</p>
              <p key={index}>category : {item.category}</p>
              <p key={index}>createdAt : {item.createdAt}</p>
              </Card>
          )} */}

          <List
              grid={{
                gutter: 16,
                column: 4,
              }}
              dataSource={state}
              renderItem={(item, index) => (
                <List.Item>
                  <Card title= <p key={item._id}>{item.title}</p>
                  extra={<Link to={"/detail/"+ item._id} >More</Link>}
                  >
                  <p>description : {item.description}</p>
                  <p>looking for : {item.collaborate}</p>
                  <p>category : {item.category}</p>
                  <p>createdAt : {item.createdAt}</p>
                  {/* description: {item.description}
                  looking for : {item.collaborate}
                  category : {item.category}
                  createdAt : {item.createdAt} */}
                  
                  
                  </Card>
                </List.Item>
              )}
            />
        </Row>
    </div>
  )
}

export default Home