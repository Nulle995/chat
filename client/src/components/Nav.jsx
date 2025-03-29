import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import Modal from "react-modal";
import Logout from "./Logout";
import ChatForm from "./ChatForm";
import Login from "./Login";
import Register from "./Register";

const Nav = () => {
  const { user } = useContext(UserContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);
  const openRegisterModal = () => setIsRegisterOpen(true);
  const closeRegisterModal = () => setIsRegisterOpen(false);
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
  return user ? (
    <>
      <nav>
        <Logout />
      </nav>
      <ChatForm />
    </>
  ) : (
    <nav>
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
    </nav>
  );
};

export default Nav;
