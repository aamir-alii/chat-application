function MessageBox({ messages }) {
  return (
    <>
      <div className="w-[90%] mx-auto h-[70%] border flex flex-col px-5">
        {messages.map((msg, idx) =>
          msg.type === "send" ? (
            <h3
              key={idx}
              className="self-end bg-cyan-100 min-w-[100px] rounded px-2 py-1"
            >
              {msg.user} : {msg.message}
            </h3>
          ) : (
            <h3
              key={idx}
              className="self-start bg-gray-100 min-w-[100px] rounded px-2 py-1"
            >
              {msg.user} : {msg.message}
            </h3>
          )
        )}
      </div>
    </>
  );
}

export default MessageBox;
