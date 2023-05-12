import React, {useEffect, useState} from 'react'
import { Input, Button, Layout, List, Avatar, Col, Row} from 'antd';
import './UserChat.css'

const { Header, Content, Footer } = Layout;
const ChatPage = () => {

    // const [chats, setChats] = useState([]);
    // const fetchChat = async () =>{

    // }

    // useEffect(()=>{
    //     fetchChat()
    // },[])

    //ส่งแบบนี้ก็ได้แฮะ
  // return (
  //   <div>{chats.map((chat)=>
  //           (<div key={chat._id}>{chat.chatName}</div>
  //       ))}
  //   </div>
  // )

  const [messages, setMessages] = useState([]);

  const handleMessageSend = (message) => {
    setMessages([...messages, { text: message, isSender: true }]);
  };


  return (
    <Layout className="chat-page">

    {/* <Row>

      <Col span={18} push={6}> */}

      <Header className="chat-header">Chat Header</Header>
        <Content className="chat-window">
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(message) => (
              <List.Item className={message.isSender ? 'message-sender' : 'message-recipient'}>
                <List.Item.Meta
                  avatar={<Avatar src="https://via.placeholder.com/50" />}
                  title={message.isSender ? 'You' : 'User'}
                  description={message.text}
                />
              </List.Item>
            )}
          />
        </Content>
        <Footer className="chat-footer">
          <Input.Search
            placeholder="Type a message"
            enterButton={<Button type="primary">Send</Button>}
            onSearch={handleMessageSend}
          />
        </Footer>

      {/* </Col>

      <Col span={6} pull={18}>
        col-6 col-pull-18
      </Col>

   </Row> */}

    </Layout>
  );
}

export default ChatPage