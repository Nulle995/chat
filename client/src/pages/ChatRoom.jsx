import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../services/api";
import { UserContext } from "../contexts/userContext";
import { io } from "socket.io-client";
import "../styles/chatRoom.css";
import MainLayout from "../layouts/MainLayout";

const ChatRoom = () => {
  const { name } = useParams();
  const [chatRoom, setChatRoom] = useState(null);
  const { user } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(null);
  const [username, setUsername] = useState("");
  const chatEndRef = useRef(null);

  const scrollChat = () => {
    if (chatEndRef.current)
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const formData = new FormData(e.target);
    if (!formData.get("content")) return;
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
    scrollChat();
    // try {
    //   const res = await API.post("messages", messageData);
    //   console.log(res);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  useEffect(() => {
    if (!user) return;
    setUsername(user.username);

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
    scrollChat();
  }, [messages]);

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
    scrollChat();
  }, [name]);
  return (
    <MainLayout>
      {chatRoom && (
        <div className="chat-room-container">
          <div className="chat-data">
            {chatRoom.name}- {chatRoom.owner.username}
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                className={`message ${
                  username === msg.author.username ? "b" : "a"
                }`}
              >
                <div>{msg.content}</div> <div>{msg.date}</div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" name="content" />
            <button>Send</button>
          </form>
        </div>
      )}
    </MainLayout>
  );
};

export default ChatRoom;
