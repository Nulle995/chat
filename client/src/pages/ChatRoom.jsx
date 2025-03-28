import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../services/api";
import { UserContext } from "../contexts/userContext";
const ChatRoom = () => {
  const { name } = useParams();
  const [chatRoom, setChatRoom] = useState(null);
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const messageData = {
      content: formData.get("content"),
      chatName: name,
      username: user.username,
    };
    console.log(messageData);
    try {
      const res = await API.post("messages", messageData);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const res = await API.get(`chat/${name}`);
        console.log(res);
        setChatRoom(res.data);
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
            {chatRoom.messages.map((msg) => (
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
