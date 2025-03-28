import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../services/api";
import { UserContext } from "../contexts/userContext";
import { io } from "socket.io-client";

const ChatRoom = () => {
  const { name } = useParams();
  const [chatRoom, setChatRoom] = useState(null);
  const { user } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.target);
    const messageData = {
      content: formData.get("content"),
      chatName: name,
      username: user.username,
    };
    console.log(messageData);
    socket.emit("send message", {
      room: name,
      message: formData.get("content"),
    });
    // try {
    //   const res = await API.post("messages", messageData);
    //   console.log(res);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  useEffect(() => {
    if (!user) return;
    const newSocket = io("http://localhost:3001", {
      withCredentials: true,
      auth: { username: user.username },
    });
    setSocket(newSocket);

    newSocket.emit("join room", name);

    newSocket.on("receive message", ({ username, message }) => {
      console.log(username, message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.emit("leave room", name);
      newSocket.disconnect();
    };
  }, [name, user]);

  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const res = await API.get(`chat/${name}`);
        console.log(res);
        setChatRoom(res.data);
        setMessages(res.data.messages);
      } catch (e) {
        console.log(e);
      }
    };
    getChatRoom();
  }, [name]);
  return (
    <div>
      {chatRoom && (
        <div className="chat-room-container">
          <div className="chat-data">
            {chatRoom.name}- {chatRoom.owner.username}
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div>
                <div>{msg.content}</div> <div>{msg.date}</div>
              </div>
            ))}
          </div>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" name="content" />
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
