import { useContext } from "react";
import ChatForm from "../components/ChatForm";
import ChatList from "../components/ChatList";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Register from "../components/Register";
import { UserContext } from "../contexts/userContext";
import "../styles/home.css";
import MainLayout from "../layouts/MainLayout";

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <MainLayout>
      <main>
        <ChatList />
      </main>
    </MainLayout>
  );
};

export default Home;
