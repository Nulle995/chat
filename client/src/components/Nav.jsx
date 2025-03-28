import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import Logout from "./Logout";
import ChatForm from "./ChatForm";
import Login from "./Login";
import Register from "./Register";

const Nav = () => {
  const { user } = useContext(UserContext);
  return user ? (
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
  );
};

export default Nav;
