import React, {useEffect, useState} from 'react'
import { Input, Button, List, Avatar } from 'antd';
import './ChatPage.css'; // Import CSS file
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")


export function Chat() {
    const [room, setRoom] = useState("");

    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const joinRoom = () => {
        if (room !== "") {
          socket.emit("join_room", room);
        }
      };

    const sendMessage = () => {
        socket.emit("send_message", {message})
    }

    // useEffect(()=>{
    //     socket.on("recieve_message",(data)=>{
    //         setMessageReceived(data.message)
    //     })
    // },[socket])


    const [messages, setMessages] = useState([]);

    const handleMessageSend = (message) => {
      setMessages([...messages, message]);
    };

  return (
    <div>
        <h1>
            Chat page
        </h1>
        <div>
            <input
            placeholder="Message..."
            onChange={(event) => {
            setMessage(event.target.value);
            }}
            />
            <button onClick={sendMessage}>send</button>
        </div>
        <div>
        <h1> Message:</h1>
        {messageReceived}

      {/* <ChatChat socket={socket} room={room}/> */}
        </div>

        <div className="chat-page">
          <div className="chat-header">Chat Header</div>
          <div className="chat-window">
            {messages.map((message, index) => (
              <div key={index} className="message">
                {message}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input type="text" onChange={(event) => handleMessageSend(event.target.value)} />
            <button onClick={() => handleMessageSend()}>Send</button>
          </div>
        </div>


    </div>
  )
}
