import { useState, useEffect } from "react";
import styles from "./ChatBox.module.css";
import { useSocket } from "@/context/socket";

const ChatBox = ({ roomId }) => {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleMessageReceive = (messageObject) => {
      setMessages((prevMessages) => [...prevMessages, messageObject]);
    };

    socket.on("receive-message", handleMessageReceive);

    return () => {
      socket.off("receive-message", handleMessageReceive);
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const messageObject = { message, roomId, userId: socket.id };
    socket.emit("send-message", messageObject);
    setMessage("");
  };

  return (
    <div className={styles.chatBox}>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.message} ${msg.userId === socket.id ? styles.activeMessage : ""}`}>
            <strong>{msg.userId}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <div className={styles.inputBox}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
