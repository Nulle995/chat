import ChatForm from "../components/ChatForm";
import ChatList from "../components/ChatList";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Register from "../components/Register";

const Home = () => {
  return (
    <div>
      Home <Login /> <Logout /> <Register /> <ChatList /> <ChatForm />{" "}
    </div>
  );
};

export default Home;
