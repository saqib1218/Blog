import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useSendMessageMutation, useGetMessagesQuery } from "../features/api/apiSlice";
import { io } from "socket.io-client";

const ChatBox = ({ selectedUser, onBack }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendMessage] = useSendMessageMutation();
  const { data: existingMessages } = useGetMessagesQuery(selectedUser._id);

  // Use useRef to store the socket instance
  const socketRef = useRef(null);

  // Load existing messages
  useEffect(() => {
    if (existingMessages) {
      setMessages(existingMessages);
    }
  }, [existingMessages]);

  // Socket.IO setup
  useEffect(() => {
    // Initialize the socket only once
    if (!socketRef.current) {
      socketRef.current = io(`http://localhost:5000`, {
        withCredentials: true, // Allow credentials (cookies)
        autoConnect: true, // Allow automatic connection
      });

      // Debug connection events
      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    const socket = socketRef.current;

    // Join the room for the selected user
    socket.emit("joinRoom", selectedUser._id);
    console.log(`Joined room for user: ${selectedUser._id}`); // Debug log

    // Listen for new messages
    const handleReceiveMessage = (newMessage) => {
      console.log("Received message:", newMessage); // Debug log
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    socket.on("receiveMessage", handleReceiveMessage);

    // Cleanup on unmount
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.disconnect();
    };
  }, [selectedUser._id]);

  // Handle sending a message
  const handleSend = async () => {
    if (message.trim()) {
      const newMessage = {
        sender: selectedUser._id,
        text: message,
      };

      // Send message via API
      await sendMessage({ receiverId: selectedUser._id, text: message });

      // Emit the message via Socket.IO
      socketRef.current.emit("sendMessage", {
        ...newMessage,
        receiver: selectedUser._id,
      });

      // Clear the input
      setMessage("");
    }
    
  };

  return (
    <div className="Chat-Box">
      <div className="Chat-Header">
        <button className="Back-Button" onClick={onBack}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className="User-Avatar">{selectedUser.name[0]}</div>
        <div className="User-Name">{selectedUser.name}</div>
      </div>
      <div className="Chat-Messages">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`Message ${msg.sender === selectedUser._id ? "Received" : "Sent"}`}
          >
            {msg.sender === selectedUser._id && (
              <div className="Message-Avatar">{selectedUser.name[0]}</div>
            )}
            <div className="Message-Text">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="Chat-Input">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="Send-Button" onClick={handleSend}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;