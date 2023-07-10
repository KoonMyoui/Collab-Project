import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import { Layout, Menu, theme, Input, Button, List, Avatar, Modal, Drawer } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import './user/UserChat.css'

import { getMyChat, leaveGroup } from '../functions/chat'
import { getAllMessage, sendMessage } from '../functions/message';

import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")

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

    let previousSenderId = null;
    let lastSender = null;
    // const uid = user.payload.id
    // const token = user.payload.token
    const [uid, setUid] = useState("");
    const [token, setToken] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    //logic chat
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedChatID, setSelectedChatID] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatData, setChatData] = useState(null);

    //socket
    const joinRoom = (e) => {
        // e.preventDefault()
        if (selectedChatID !== "") {
            console.log("join_room ",selectedChatID)
          socket.emit("join_room", selectedChatID);
        }
    };

    const handleMessageSend = (message) => {
        // console.log(message)
        //set socket.io
        socket.emit("send_message", {content: message, chatId: selectedChatID, sender: uid, room: selectedChatID})
        // sendMessage({content: message, chatId: selectedChatID}, token)
        // .then(res =>{
        //     console.log(res)
        //     setMessages([...messages, res.data])
        //     setNewMessage("")
            
        // }).catch(err=>{
        //     console.log(err)
        // })

        setNewMessage("")
    };

    const handleSelectedChat = (value) =>{
        console.log("chat_id",value._id)

        fetchMessage(value._id, token)

        setSelectedChat(value.chatName);
        setSelectedChatID(value._id)
        setChatData(value)

        // joinRoom()
    }

    const chatMessage = messages.filter((message) => {
        console.log(message.chat.chatName)
        //check name chat list and name message is ===
        return selectedChat ? selectedChat === message.chat.chatName : true;
    })

    //data my chat fetch
    const [data, setData] = useState([]);

    useEffect(()=>{
        if (token){
            fetchChat()
        }
        
    }, [token]);

    useEffect(() => {
        if (user && user.payload) {
          setToken(user.payload.token);
          setUid(user.payload.id)
        }
    }, [user]);
    
    useEffect(() => {
        if (!socket) return;
        socket.on("recieve_message", (data) =>{
            console.log("recieve_message other room", data.room, " room : ", selectedChatID)
            if(data.room === selectedChatID){
                console.log("recieve_message", data)
                fetchMessage(selectedChatID, token)
            };

            console.log("recieve_message other room", data.room, " room : ", selectedChatID)
            
        })

    }, [socket])

    useEffect(() => {
        if (!selectedChatID) return;
        joinRoom()
        
    }, [selectedChatID])

    const fetchChat = () => {
        console.log("fetchChat ",token)
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //Drawer
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
// List Handle
    const handleLeaveGroup = (chatId) => {
        console.log('Edit item with id:', chatId);
        // getAllMessage(chatId, token)
        handleRemoveMember({chatId, uid})
        
      };
    
    const handleDelete = (value) => {
        console.log('Delete item with id:', value);
        handleRemoveMember(value)
    };

    const handleRemoveMember = (value) => {
        console.log('handleRemoveMember item with id:', value);
        leaveGroup(value, token)
        .then(res => {
            console.log(res)
            alert(res.data)
            // fetchMessage(value.chatId, token)
            // fetchChat()

        }).catch(err =>{
            console.log(err.response)
        })
    };

    console.log(data )
    console.log(chatMessage)
    console.log(selectedChat)
    console.log(chatData)
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

            {selectedChat && (
            <Layout>
            
                <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
                >
                    {selectedChat && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                            <Button type="primary" onClick={showDrawer}>option</Button>
                        </div>
                        
                    )}

                    <Drawer
                        title="option"
                        placement='right'
                        closable={false}
                        onClose={onClose}
                        open={open}
                        key='right'
                    >
                        {chatData && (
                        <List
                            itemLayout="horizontal"
                            dataSource={chatData.users}
                            renderItem={(item, index) => (
                            <List.Item
                            //check isAdmin
                                
                                actions={[
                                    chatData.groupAdmin._id === uid && (
                                        <Button danger onClick={() => handleDelete({
                                            chatId: chatData._id, 
                                            uid: item._id
                                            })} 
                                            key="delete">
                                            Delete
                                        </Button>
                                    )
                                    
                                ]}
                            >
                                
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                    title={item.username}
                                    description={false}
                                />
                            </List.Item>
                           
                            )}
                        />
                        )}
                        {chatData && (
                            <Button type="primary" danger onClick={()=> handleLeaveGroup(chatData._id)}>Leave Group</Button>
                        )}
                            
                    </Drawer>
                    
                </Header> 

                <Content
                className="chat-window"
                style={{
                }}
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
                    chatMessage.map((message, index) => {
                    const isLastSender =
                        index === chatMessage.length - 1 ||
                        message.sender._id !== chatMessage[index + 1].sender._id;

                    const isRecipient = message.sender._id !== user.payload.id;

                    // Check if it's the last message of the sender or the recipient
                    if (isLastSender || (isRecipient && previousSenderId !== message.sender._id)) {
                        previousSenderId = message.sender._id;

                        return (
                        <div
                            className={
                            message.sender._id === user.payload.id
                                ? 'message-sender'
                                : 'message-recipient'
                            }
                            key={message._id}
                            style={{ marginBottom: '15px'}}
                        >
                            {/* <Avatar
                            size="middle"
                            style={{ verticalAlign: 'middle', marginRight: 8 }}
                            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                            /> */}

                            
                            {/* <span
                            // style={{
                            //     backgroundColor: `${
                            //     message.sender._id === user.payload.id
                            //         ? '#B9F5D0'
                            //         : '#BEE3F8'
                            //     }`,
                            //     marginLeft: message.sender._id === user.payload.id ? 33 : 0,
                            //     marginTop: message.sender._id === user.payload.id ? 3 : 3,
                            //     borderRadius: '20px',
                            //     padding: '5px 15px',
                            //     maxWidth: '75%',
                            // }}

                            style={{
                                backgroundColor: `${
                                  message.sender._id === user.payload.id
                                    ? '#B9F5D0'
                                    : '#BEE3F8'
                                }`,
                                marginLeft:
                                  message.sender._id === user.payload.id ? 0 : '40px',
                                marginTop: '3px',
                                borderRadius: '20px',
                                padding: '5px 15px',
                                maxWidth: '75%',
                              }}
                            >
                            {message.content}
                            </span> */}
                            

                            {message.sender._id === user.payload.id ? (
                                <>
                                    <span

                                        style={{
                                            backgroundColor: `${
                                            message.sender._id === user.payload.id
                                                ? '#B9F5D0'
                                                : '#BEE3F8'
                                            }`,
                                            marginLeft:
                                            message.sender._id === user.payload.id ? 30 : '40px',
                                            marginRight: 15,
                                            marginTop: '3px',
                                            borderRadius: '20px',
                                            padding: '5px 15px',
                                            maxWidth: '75%',
                                        }}
                                        >
                                        {message.content}
                                    </span>
                                    <Avatar size={"large"}>{message.sender.username}</Avatar>
                                </>)
                                :
                                <>
                                    <Avatar size={"large"}>{message.sender.username}</Avatar>
                                    <span
                                        style={{
                                            backgroundColor: `${
                                            message.sender._id === user.payload.id
                                                ? '#B9F5D0'
                                                : '#BEE3F8'
                                            }`,
                                            marginLeft:
                                            message.sender._id === user.payload.id ? 0 : '10px',
                                            marginTop: '3px',
                                            borderRadius: '20px',
                                            padding: '5px 15px',
                                            maxWidth: '75%',
                                        }}
                                    >
                                        {message.content}
                                    </span>
                                </>
                            }
                        </div>
                        );
                    }

                    // return null;
                    else if (!isLastSender){
                        return (<div
                            className={
                            message.sender._id === user.payload.id
                                ? 'message-sender'
                                : 'message-recipient'
                            }
                            key={message._id}
                        >
                            {/* <Avatar
                            size="middle"
                            style={{ verticalAlign: 'middle', marginRight: 8 }}
                            src="https://via.placeholder.com/50"
                            /> */}

                            <span
                            style={{
                                backgroundColor: `${
                                message.sender._id === user.payload.id
                                    ? '#B9F5D0'
                                    : '#BEE3F8'
                                }`,
                                marginLeft: message.sender._id === user.payload.id ? 33 : 60,
                                marginTop: message.sender._id === user.payload.id ? 3 : 3,
                                marginRight: 65,
                                borderRadius: '20px',
                                padding: '5px 15px',
                                maxWidth: '75%',
                            }}
                            >
                            {message.content}
                            </span>
                        </div>);
                    }
                    })}
                </div>
            
                </Content>

                <Footer className="chat-footer">

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
            )}

            {(!selectedChat && (
                <div className="unselect-chat">
                    <h1>เลือกบทสนทนา</h1>
                </div>
            ))}
            
        </Layout>
        
    </div>
  )
}

export default NewChat