import "../styles/chatCard.css";
import { Link } from "react-router-dom";
const ChatCard = ({ chat }) => {
  console.log(chat);
  return (
    <article className="chat-card">
      <div className="thumbnail">
        <img src="https://picsum.photos/250/200" alt="" />
      </div>
      <div className="info">
        <Link to={`/chat/${chat.name}`}>
          <h3>{chat.name}</h3>
        </Link>{" "}
        <p>{chat.owner.username}</p>
      </div>
    </article>
  );
};

export default ChatCard;
