import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import { Layout, Menu, theme, Input, Button, List, Avatar } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import './user/UserChat.css'

import { getMyChat } from '../functions/chat'
import { getAllMessage, sendMessage } from '../functions/message';

const NewChat = () => {
    //Antd
    const { Header, Content, Footer, Sider } = Layout;
    const {TextArea} = Input;
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    //token
    const user = useSelector((state) => state.userStore)
    console.log('user',user)
    const token = user.payload.token

    //logic chat
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedChatID, setSelectedChatID] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleMessageSend = (message) => {
        console.log(message)
        sendMessage({content: message, chatId: selectedChatID}, token)
        .then(res =>{
            console.log(res)
            setMessages([...messages, res.data])
            setNewMessage("")
            
        }).catch(err=>{
            console.log(err)
        })

    };

    const handleSelectedChat = (value) =>{
        console.log("chat_id",value._id)

        fetchMessage(value._id, token)

        setSelectedChat(value.chatName);
        setSelectedChatID(value._id)
    }

    const chatMessage = messages.filter((message) => {
        console.log(message.chat.chatName)
        //check name chat list and name message is ===
        return selectedChat ? selectedChat === message.chat.chatName : true;
    })

    //data my chat fetch
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetchChat()
    }, []);

    // useEffect(()=>{

    // }, [])
    
    const fetchChat = () => {
        getMyChat(token)
        .then(res => {
          setData(res.data)
    
        }).catch(err =>{
            console.log(err.response)
        })
    }

    const fetchMessage = (chatId, token) => {
        getAllMessage(chatId, token)
        .then(res => {
            console.log(res.data)
            setMessages(res.data)
        }).catch(err =>{
            console.log(err.response)
        })
    }

    console.log(data )
    console.log(chatMessage)
    console.log(selectedChat)
  return (
    <div>
        <Layout className="chat-page">
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
                }}
            >
                <div className="logo" />
                <Menu
                theme="dark"
                mode="inline"
                >
                    {data.map((item, index) => (
                         <Menu.Item 
                         key= {item._id}
                         onClick={() => handleSelectedChat(item)}
                         selectedKeys={[selectedChat]}
                         >
                            {item.chatName}
                         </Menu.Item>
                    ))}

                </Menu>
            </Sider>

            <Layout>
                <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
                /> 

                <Content
                className="chat-window"
                // style={{
                //     margin: '24px 16px 0',
                // }}
                >
                {/* <div
                    style={{
                    // padding: 24,
                    // minHeight: 360,
                    background: colorBgContainer,
                    }}
                >
                    
                    <List
                        itemLayout="horizontal"
                        dataSource={chatMessage}
                        renderItem={(message) => (
                        <List.Item className={message.sender._id === user.payload.id ? 'message-sender' : 'message-recipient'}>
                            <List.Item.Meta
                            avatar={<Avatar src="https://via.placeholder.com/50" />}
                            title={message.sender._id === user.payload.id ? 'You' : message.sender.username}
                            description={message.content}
                            />
                        </List.Item>
                        )}
                    />

                </div> */}

                <div>
                    {chatMessage && 
                    chatMessage.map((message) => (
                        <div
                        className={message.sender._id === user.payload.id ? 'message-sender' : 'message-recipient'}  
                        key={message._id}>

                            {message.sender._id !== user.payload.id && (
                                <Avatar size="middle" style={{ verticalAlign: 'middle'}} src="https://via.placeholder.com/50" />
                            )}

                            <span 
                                // className={message.sender._id === user.payload.id ? 'message-sender' : 'message-recipient'}
                                style={{
                                backgroundColor: `${
                                    message.sender._id === user.payload.id ? "#B9F5D0" : "#BEE3F8"
                                }`,
                                marginLeft: message.sender._id === user.payload.id ? 33 : 0,
                                marginTop: message.sender._id === user.payload.id ? 3 : 3,
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                                
                                }}
                            >
                                {message.content}
                                {/* {message.content.replace(/\r?\n/g, '\n')} */}
                            </span>

                            {message.sender._id === user.payload.id && (
                                <Avatar size="middle" style={{ verticalAlign: 'middle'}} src="https://via.placeholder.com/50" />
                                )}


                        </div>
                    ))}

                </div>
                </Content>

                <Footer className="chat-footer">
                    {/* <Input.Search
                        placeholder="Type a message"
                        enterButton={<Button type="primary">Send</Button>}
                        onSearch={handleMessageSend}
                    /> */}

                    <TextArea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        autoSize={{
                        minRows: 1,
                        maxRows: 4,
                        }}
                        style={{
                            flex: 1,
                            border: 'none',
                            borderRadius: '5px',
                            padding: '10px',
                            fontSize: '16px',
                            marginRight: '10px',
                        }}
                    />
                    <button onClick={() => handleMessageSend(newMessage)}> Send </button>
                </Footer>

            </Layout>
        </Layout>
    </div>
  )
}

export default NewChat