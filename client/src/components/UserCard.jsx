const UserCard = ({ user }) => {
  return (
    <div>
      Username: {user.username} Global Role: {user.role} Chats:{" "}
      {user.chats.length} {user.chats.map((chat) => chat.name)} Messages:{" "}
      {user.messages.length}
      <div>
        {user.messages.map((message) => (
          <div>
            {message.chat.name} - {message.chat.owner.username} -{" "}
            {message.content} - {message.date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
