import { useState } from "react";
import Modal from "react-modal";
import formatDate from "../utils/formatDate";

const Message = ({ msg, isAdmin, username }) => {
  const hasPermission = msg.author.username === username || isAdmin;
  const [showOptions, setShowOptions] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const closeEditModal = () => setIsEditOpen(false);
  const closeDeleteModal = () => setIsDeleteOpen(false);
  const openEditModal = () => setIsEditOpen(true);
  const openDeleteModal = () => setIsDeleteOpen(true);

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
              <div className={`hide ${showOptions && "show"}`}>
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
                  <p>ererfffff</p>
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
