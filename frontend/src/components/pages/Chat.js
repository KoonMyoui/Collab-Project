import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Menu, Input, Button, List, Avatar, Modal, Drawer } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './user/UserChat.css';
import { getMyChat, leaveGroup } from '../functions/chat';
import { getAllMessage, sendMessage } from '../functions/message';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5000");


const Chat = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const { TextArea } = Input;
  
  let previousSenderId = null;

  const user = useSelector((state) => state.userStore);
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatID, setSelectedChatID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user && user.payload) {
      setToken(user.payload.token);
      setUid(user.payload.id);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      fetchChat();
    }
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    socket.on("recieve_message", (data) => {
      if (data.room === selectedChatID) {
        fetchMessage(selectedChatID, token);
      }
    });

    return () => {
      socket.off("recieve_message");
    };
  }, [selectedChatID, token]);

  const fetchChat = () => {
    getMyChat(token)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const fetchMessage = (chatId, token) => {
    getAllMessage(chatId, token)
      .then(res => {
        setMessages(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const joinRoom = () => {
    if (selectedChatID) {
      socket.emit("join_room", selectedChatID);
    }
  };

  const handleMessageSend = () => {
    if (newMessage.trim() === "") return;

    socket.emit("send_message", {
      content: newMessage,
      chatId: selectedChatID,
      sender: uid,
      room: selectedChatID
    });

    setNewMessage("");
  };

  const handleSelectedChat = (value) => {
    setSelectedChat(value.chatName);
    setSelectedChatID(value._id);
    setData(value);
  };

  const chatMessage = messages.filter((message) => {
    return selectedChat ? selectedChat === message.chat.chatName : true;
  });

  useEffect(() => {
    if (!selectedChatID) return;

    joinRoom();
  }, [selectedChatID]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLeaveGroup = (chatId) => {
    leaveGroup({ chatId, uid }, token)
      .then(res => {
        fetchMessage(chatId, token);
        fetchChat();
      })
      .catch(err => {
        console.log(err.response);
      });
  };

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
          <Menu theme="dark" mode="inline">
            {data.map((item) => (
              <Menu.Item
                key={item._id}
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
                // background: colorBgContainer,
              }}
            >
              {selectedChat && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                  <Button type="primary" onClick={showDrawer}>option</Button>
                </div>
              )}
            </Header>

            <Content className="chat-window">
              <div>
                {chatMessage.map((message, index) => {
                  const isLastSender =
                    index === chatMessage.length - 1 ||
                    message.sender._id !== chatMessage[index + 1].sender._id;

                  const isRecipient = message.sender._id !== uid;

                  if (isLastSender || (isRecipient && previousSenderId !== message.sender._id)) {
                    previousSenderId = message.sender._id;

                    return (
                      <div
                        className={
                          message.sender._id === uid ? 'message-sender' : 'message-recipient'
                        }
                        key={message._id}
                      >
                        <Avatar
                          size="middle"
                          style={{ verticalAlign: 'middle', marginRight: 8 }}
                          src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                        />
                        <span
                          style={{
                            backgroundColor: `${
                              message.sender._id === uid ? '#B9F5D0' : '#BEE3F8'
                            }`,
                            marginLeft: message.sender._id === uid ? 33 : 0,
                            marginTop: message.sender._id === uid ? 3 : 3,
                            borderRadius: '20px',
                            padding: '5px 15px',
                            maxWidth: '75%',
                          }}
                        >
                          {message.content}
                        </span>
                      </div>
                    );
                  }

                  return null;
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

export default Chat
