import React, { useState, useEffect } from 'react'
import { getAllOpport } from '../functions/opport';
import { Link } from 'react-router-dom';
import { Col, Row, Select , Card, Skeleton, List, Input, Divider} from 'antd';

import moment from "moment/min/moment-with-locales"

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

  const onClickCard = (item) =>{
    console.log("AA", item)
  }

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const selectCollabOptions = [
    { value: 'Software engineer', label: 'Software engineer' },
    { value: 'Art', label: 'Art' },
    { value: 'Science', label: 'Science' },
    { value: 'Other', label: 'Other' },
    
  ];

  const selectCategoryOptions = [
      { value: 'Art', label: 'Art' },
      { value: 'Science', label: 'Science' },
      { value: 'other', label: 'other' },
  ];

  return (
    <div>
        <Row>
          <Col span={12} offset={6}>
            <h1 style={{display:'flex', justifyContent: 'center'}}>Home page</h1>
            <Input.Search
              placeholder="Search..."
              onSearch={value => console.log(value)}
              style={{ width: '100%', marginBottom: 16 }}
            />

            <Select 
            allowClear
            // showSearch
            style={{
              width: '50%'
            }}
            placeholder="Select Category"
            // optionFilterProp="children"
            onChange={onChange}
            // onSearch={onSearch}
            // filterOption={(input, option) =>
            //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            // }
            >
                {selectCategoryOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                ))}
            </Select>

          <Select 
          allowClear
          // showSearch
          style={{
            width: '50%'
          }}
          placeholder="Select looking for"
          // optionFilterProp="children"
          onChange={onChange}
          // onSearch={onSearch}
          // filterOption={(input, option) =>
          //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          // }
          >
              {selectCollabOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
              ))}
          </Select>

          </Col>
        </Row>
        <Divider />
        <Row>
          <List
              grid={{
                gutter: 16,
                column: 4,
              }}
              dataSource={state}
              renderItem={(item, index) => (
                <List.Item>
                  <Link to={"/detail/"+ item._id} >
                    <Card
                      hoverable
                      onClick={()=> onClickCard(item._id)}
                      // title= <p key={item._id}>{item.title}</p>
                      title= {item.title}
                      // extra={<Link to={"/detail/"+ item._id} >More</Link>}
                    >
                      {/* <p>description : {item.description}</p> */}
                      <p>looking for : {item.collaborate}</p>
                      <p>category : {item.category}</p>
                      {/* <p>createdAt : {item.createdAt}</p> */}
                      <p>createAt : {moment(item.createdAt).locale("th").format("ll")}</p>
                      {/* description: {item.description}
                      looking for : {item.collaborate}
                      category : {item.category}
                      createdAt : {item.createdAt} */}
                    
                    </Card>
                  </Link>
                </List.Item>
              )}
          />
        </Row>
    </div>
  )
}

export default Home