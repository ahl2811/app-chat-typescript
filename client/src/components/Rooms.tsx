import React, { useState } from "react";
import EVENTS from "../constants/events";
import { useSocket } from "../context/socket.context";

function Rooms() {
  const { socket, roomId, rooms } = useSocket();
  const [roomName, setRoomName] = useState("");

  function handleCreateRoom() {
    if (!String(roomName).trim()) return;
    console.log("click");
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
  }

  function handleJoinRoom(key: string) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav>
      <div>
        <input
          type="text"
          placeholder="Room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button onClick={handleCreateRoom}>CREATE ROOM</button>
      </div>

      <ul>
        {Object.keys(rooms).map((key) => {
          return (
            <div key={key}>
              <button
                disabled={key === roomId}
                title={`Join ${rooms[key].name}`}
                onClick={() => handleJoinRoom(key)}
              >
                {rooms[key].name}
              </button>
            </div>
          );
        })}
      </ul>
    </nav>
  );
}

export default Rooms;
