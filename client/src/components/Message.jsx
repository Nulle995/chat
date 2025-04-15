import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import formatDate from "../utils/formatDate";
import { API } from "../services/api";

const Message = ({ msg, isAdmin, username, socket, chatRoom }) => {
  const hasPermission = msg.author.username === username || isAdmin;
  const [editedMessage, setEditedMessage] = useState(msg.content);
  const [showOptions, setShowOptions] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const optionsRef = useRef(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const closeOptionsModal = () => setIsOptionsOpen(false);
  const openOptionsModal = () => setIsOptionsOpen(true);
  const closeEditModal = () => {
    setEditedMessage(msg.content);
    setIsEditOpen(false);
  };
  const closeDeleteModal = () => setIsDeleteOpen(false);
  const openEditModal = () => setIsEditOpen(true);
  const openDeleteModal = () => setIsDeleteOpen(true);

  const handleEditMessage = async () => {
    socket.emit("edited message", {
      message: editedMessage,
      room: chatRoom,
      messageId: msg.id,
    });
    setIsEditOpen(false);
    // try {
    //   const res = await API.patch("messages", {
    //     messageId: msg.id,
    //     content: editedMessage,
    //     author: msg.author.username,
    //   });
    //   console.log(res);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  useEffect(() => {
    if (!showOptions) return;
    const handleClickOutside = (e) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  const handleClick = () => {
    setShowOptions(!showOptions);
    console.log("hola");
  };

  const customStyles = {
    content: {
      margin: "auto",
      width: "fit-content",
      height: "fit-content",
      backgroundColor: "rgba(0,0,0,0.9)",
    },
  };

  return (
    <div className={`message ${username === msg.author.username ? "b" : "a"}`}>
      <div className="info">
        <div>
          {hasPermission && (
            <div className="options">
              <div onClick={handleClick}>{`${showOptions ? "❌" : "⋯"}`}</div>
              <div className={`hide ${showOptions && "show"}`} ref={optionsRef}>
                <p onClick={openDeleteModal}>delete</p>
                <Modal
                  isOpen={isDeleteOpen}
                  onRequestClose={closeDeleteModal}
                  shouldCloseOnOverlayClick={true}
                  style={customStyles}
                >
                  <p>sssss</p>
                </Modal>
                <p onClick={openEditModal}>Edit</p>
                <Modal
                  isOpen={isEditOpen}
                  onRequestClose={closeEditModal}
                  shouldCloseOnOverlayClick={true}
                  style={customStyles}
                >
                  <input
                    type="text"
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                    autoFocus
                  />
                  <button onClick={handleEditMessage}>✔️</button>
                  <button onClick={closeEditModal}>❌</button>
                </Modal>
              </div>
            </div>
          )}
          <p>{msg.author.username}</p>
        </div>{" "}
        *{formatDate(msg.date)}
      </div>
      <div>{msg.content}</div>
    </div>
  );
};

export default Message;
