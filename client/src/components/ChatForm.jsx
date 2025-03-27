import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { API } from "../services/api";

const ChatForm = () => {
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const chatData = {
      name: formData.get("name"),
      username: user.username,
    };
    try {
      const res = await API.post("chat", chatData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" /> <button>Create Chat</button>
    </form>
  );
};

export default ChatForm;
