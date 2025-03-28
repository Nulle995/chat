import { useContext } from "react";
import ChatForm from "../components/ChatForm";
import ChatList from "../components/ChatList";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Register from "../components/Register";
import { UserContext } from "../contexts/userContext";
import "../styles/home.css";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <main>
      {user ? (
        <>
          <nav>
            <Logout />
          </nav>
          <ChatForm />
        </>
      ) : (
        <nav>
          <Login /> <Register />
        </nav>
      )}
      <ChatList />
    </main>
  );
};

export default Home;
