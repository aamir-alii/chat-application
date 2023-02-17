import MessageBox from "./MessageBox";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
const Chat = () => {
  const [message, setMessage] = useState("");
  const [reciever, setReciever] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(messages);
  const handleSend = () => {
    console.log("msg-send");
    socket.emit("new-msg", { message, reciever });
    setMessages([...messages, { type: "send", message, user: "Me" }]);
    setMessage("");
  };
  useEffect(() => {
    socket.on("recieve", ({ message, sender }) => {
      console.log("msg-recieved");
      setMessages([...messages, { type: "recieve", message, user: sender }]);
    });
    socket.on("verification", (msg) => {
      const token = Cookies.get("token");
      if (token) socket.emit("send-jwt", token);
    });
  });
  return (
    <>
      <div className="flex justify-center items-center bg-gray-100 h-[100vh]">
        <div className="flex justify-center items-center bg-white w-[50%] h-[50vh] flex-col gap-2">
          <MessageBox messages={messages} />
          <div className="flex flex-col   gap-2 items-center w-[90%]">
            <input
              type="text"
              className="px-3 py-2  border"
              placeholder="Enter Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input
              type="text"
              className="px-3 py-2  border"
              placeholder="Enter reciever name"
              value={reciever}
              onChange={(e) => setReciever(e.target.value)}
            />
            <button
              className="px-3 py-2 bg-teal-400 rounded  cursor-pointer hover:bg-teal-500 hover:text-white  "
              onClick={handleSend}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
