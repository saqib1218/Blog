import React, { useState } from "react";
import UserList from "./UserList";
import ChatBox from "./ChatBox";

const ChatUI = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className="Chat-UI">
      {selectedUser ? (
        <ChatBox selectedUser={selectedUser} onBack={handleBack} />
      ) : (
        <UserList onUserClick={handleUserClick} />
      )}
    </div>
  );
};

export default ChatUI;