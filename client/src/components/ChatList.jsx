import { useEffect, useState } from "react";
import { API } from "../services/api";
import ChatCard from "./ChatCard";

const ChatList = () => {
  const [chatList, setChatList] = useState(null);
  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await API.get("chat/all");
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    getChats();
  }, []);
  return (
    <div>
      {chatList &&
        chatList.map((chat) => <ChatCard key={chat.id} chat={chat} />)}
    </div>
  );
};

export default ChatList;
