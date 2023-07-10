import React, { useState, useEffect } from 'react'
import { getAllOpport, searchOpport } from '../functions/opport';
import { Link } from 'react-router-dom';
import { Col, Row, Select , Card, Skeleton, List, Input, Divider, Pagination} from 'antd';

import moment from "moment/min/moment-with-locales"

const { Meta } = Card;

const Home = () => {
  const [loading, setloading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCollaborator, setSelectedCollaborator] = useState();
  const [state, setstate] = useState([]);

  useEffect(()=>{
    loadData()
  }, []);

  // console.log('all oppo',state)

  const loadData = () => {

      // getAllOpport()
      // .then(res => {

      //   setloading(false)
      //   setstate(res.data)

      // }).catch(err =>{
      //     console.log(err.response)
      // })

      const params = {};
      
      searchOpport(params)
      .then(res => {
        setloading(false)
        setstate(res.data)
        console.log("searched", res)
  
      }).catch(err =>{
          console.log(err.response)
      })
  }

  const onClickCard = (item) =>{
    console.log("AA", item)
  }

  const onColabChange = (value) => {
    console.log(`selected colab ${value}`);
    setSelectedCollaborator(value)
    
  };

  const onCategoryChange = (value) => {
    console.log(`selected category ${value}`);
    setSelectedCategory(value)
  };

  const onSearch = (value) => {
    const params = {
      keyword: value,
      category: selectedCategory,
      collaborator: selectedCollaborator,
    };

    console.log('search:', params);
    searchOpport(params)
    .then(res => {
      setloading(false)
      setstate(res.data)
      console.log("searched", res)


    }).catch(err =>{
        console.log(err.response)
    })
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
              onSearch={onSearch}
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
              onChange={onCategoryChange}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            >
                {selectCategoryOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                ))}
            </Select>

            <Select 
              allowClear
              style={{
                width: '50%'
              }}
              placeholder="Select looking for"
              // optionFilterProp="children"
              onChange={onColabChange}
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

        <Row gutter={[16, 16]}>
        {state.map((item, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
            <Link to={"/detail/" + item._id}>
              <Card
                hoverable
                onClick={() => onClickCard(item._id)}
                style={{ height: '100%' }}
              >
                <div style={{ minHeight: '120px' }}>
                  <Meta title={item.title} 
                  description={
                    item.description.length < 200 ? (
                      item.description
                    ) : (
                      item.description.slice(0, 200) + '...'
                    )
                  } />
                </div>
                <div style={{ marginTop: 'auto' }}>
                  <p>Looking for: {item.collaborate}</p>
                  <p>Category: {item.category}</p>
                  <p>Created At: {moment(item.createdAt).locale("th").format("ll")}</p>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
        {/* <Pagination defaultCurrent={1} total={50} /> */}
    </div>
  )
}

export default Home