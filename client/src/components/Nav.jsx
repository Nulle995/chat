import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Logout from "./Logout";
import ChatForm from "./ChatForm";
import Login from "./Login";
import Register from "./Register";
import "../styles/nav.css";

const Nav = () => {
  const { user } = useContext(UserContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isChatFormOpen, setIsChatFormOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);
  const openRegisterModal = () => setIsRegisterOpen(true);
  const closeRegisterModal = () => setIsRegisterOpen(false);
  const openChatFormModal = () => setIsChatFormOpen(true);
  const closeChatFormModal = () => setIsChatFormOpen(false);
  const customStyles = {
    content: {
      margin: "auto",
      width: "fit-content",
      height: "fit-content",
      backgroundColor: "rgba(0,0,0,0.9)",
    },
  };
  Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.3)";
  Modal.defaultStyles.overlay.backdropFilter = "blur(1px)";
  useEffect(() => {
    if (user && user.role === "admin") setIsAdmin(true);
  }, [user]);
  return user ? (
    <>
      <nav className="main-nav">
        <Link to={"/"}>Logo </Link>
        <div>
          <Link to="/admin">
            <button>Admin Panel</button>
          </Link>
          <button onClick={openChatFormModal}>Create Chat</button>
          <Modal
            isOpen={isChatFormOpen}
            onRequestClose={closeChatFormModal}
            shouldCloseOnOverlayClick={true}
            style={customStyles}
          >
            <ChatForm />
          </Modal>
          <Logout />
        </div>
      </nav>
    </>
  ) : (
    <nav>
      <Link to={"/"}>Logo</Link>
      <div>
        <button onClick={openLoginModal}>Login</button>
        <Modal
          isOpen={isLoginOpen}
          onRequestClose={closeLoginModal}
          shouldCloseOnOverlayClick={true}
          style={customStyles}
        >
          <Login />
        </Modal>{" "}
        <button onClick={openRegisterModal}>Register</button>
        <Modal
          isOpen={isRegisterOpen}
          onRequestClose={closeRegisterModal}
          shouldCloseOnOverlayClick={true}
          style={customStyles}
        >
          <Register />
        </Modal>
      </div>
    </nav>
  );
};

export default Nav;
