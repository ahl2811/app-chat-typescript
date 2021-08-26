import React, { useState } from "react";
import EVENTS from "../constants/events";
import { IMessage } from "../constants/types";
import { useSocket } from "../context/socket.context";

function Messages() {
  const { socket, username, messages, setMessages, roomId } = useSocket();
  const [message, setMessage] = useState("");

  function handleSendMessage() {
    if (!String(message).trim()) return;
    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message, username });

    const date = new Date();

    setMessages([
      ...messages,
      {
        username: "You",
        message,
        time: `${date.getHours()}:${date.getMinutes()}`,
      },
    ]);

    setMessage("");
  }

  return (
    <>
      {roomId && (
        <div>
          {messages?.length > 0 && (
            <ul>
              {messages.map((mess: IMessage, index: number) => (
                <li key={index.toString()}>
                  {`${mess.time}-${mess.username}-${mess.message}`}
                </li>
              ))}
            </ul>
          )}
          <input
            placeholder="Type message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button onClick={handleSendMessage}>SEND</button>
        </div>
      )}
    </>
  );
}

export default Messages;
