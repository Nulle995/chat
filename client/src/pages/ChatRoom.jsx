import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { API } from "../services/api";
import { UserContext } from "../contexts/userContext";
import MainLayout from "../layouts/MainLayout";
import "../styles/chatRoom.css";
import Message from "../components/Message";
import Participant from "../components/Participant";

const ChatRoom = () => {
  const { name } = useParams();
  const [chatRoom, setChatRoom] = useState(null);
  const { user } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState(null);
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [usersOnline, setUsersOnline] = useState([]);
  const chatEndRef = useRef(null);
  const [participants, setParticipants] = useState([]);

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
    e.target.reset();
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
    if (user.role === "admin") setIsAdmin(true);
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

    newSocket.on("message edited", (editedMsg) => {
      console.log(editedMsg);
      setMessages((prev) =>
        prev.map((msg) => {
          return msg.id === editedMsg.id ? editedMsg : msg;
        })
      );
    });

    newSocket.on("message deleted", (messageId) => {
      setMessages((prev) =>
        prev.filter((msg) => {
          return msg.id !== messageId;
        })
      );
    });

    newSocket.on("connected user", (connectedUsers) => {
      console.log(connectedUsers);
      setUsersOnline(connectedUsers);
    });

    newSocket.on("participants", (participants) => {
      console.log(participants);
      setParticipants(participants);
      participants.forEach((participant) => {
        if (participant.role === "OWNER") {
          setIsOwner(participant.username);
        }
      });
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
        <div className="chat-room">
          <div className="chat-room-container">
            <div className="chat-data">
              <div>{isOwner && "⚙️"} </div>
              <div>
                {chatRoom.name}- {chatRoom.owner.username} -{" "}
                {parseInt(usersOnline) === 1
                  ? `${usersOnline} User online`
                  : `${usersOnline} Users online`}
              </div>
            </div>
            <div className="chat-messages">
              {messages.map((msg) => (
                <Message
                  msg={msg}
                  username={username}
                  isAdmin={isAdmin}
                  key={msg.id}
                  socket={socket}
                  chatRoom={name}
                />
              ))}
              <div ref={chatEndRef}></div>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <input type="text" name="content" autoComplete="off" />
              <button>Send</button>
            </form>
          </div>
          <div className="participants">
            <h3>Participants</h3>
            {participants.length > 0
              ? participants.map((participant) => {
                  return <Participant participant={participant} />;
                })
              : "No participants"}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ChatRoom;
