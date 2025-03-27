const ChatCard = ({ chat }) => {
  return (
    <div>
      {chat.name} {chat.author} {chat.messages}
    </div>
  );
};

export default ChatCard;
