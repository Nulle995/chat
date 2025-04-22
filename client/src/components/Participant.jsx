import React from "react";

const Participant = ({ participant }) => {
  const { username, isOnline } = participant;

  return (
    <div className={`participant ${isOnline ? "online" : "offline"}`}>
      {username}
    </div>
  );
};

export default Participant;
