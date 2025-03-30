import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import formatDate from "../utils/formatDate";

const Message = ({ msg, isAdmin, username }) => {
  const hasPermission = msg.author.username === username || isAdmin;
  const [showOptions, setShowOptions] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const optionsRef = useRef(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const closeOptionsModal = () => setIsOptionsOpen(false);
  const openOptionsModal = () => setIsOptionsOpen(true);
  const closeEditModal = () => setIsEditOpen(false);
  const closeDeleteModal = () => setIsDeleteOpen(false);
  const openEditModal = () => setIsEditOpen(true);
  const openDeleteModal = () => setIsDeleteOpen(true);

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
