import React, { useState } from "react";
import Messages from "../components/Messages";
import Rooms from "../components/Rooms";
import { useSocket } from "../context/socket.context";

function Home() {
  const { username, setUsername } = useSocket();
  const [text, setText] = useState("");

  function handleSetUsername() {
    if (!text) {
      return;
    }
    setUsername(text);
  }

  return (
    <div>
      {!username ? (
        <div>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleSetUsername}>START</button>
          </div>
        </div>
      ) : (
        <div>
          <Rooms />
          <Messages />
        </div>
      )}
    </div>
  );
}

export default Home;
