import { useEffect, useState } from "react";
import { API } from "../services/api";
import ChatCard from "./ChatCard";
import "../styles/chatList.css";

const ChatList = () => {
  const [chatList, setChatList] = useState(null);
  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await API.get("chat/all");
        setChatList(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getChats();
  }, []);
  return (
    <section className="chat-list">
      {chatList &&
        chatList.map((chat) => <ChatCard key={chat.id} chat={chat} />)}
    </section>
  );
};

export default ChatList;
