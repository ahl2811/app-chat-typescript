import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import EVENTS from "../constants/events";
import { IMessage } from "../constants/types";

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  rooms: Record<string, { name: string }>;
  roomId?: string;
  messages: IMessage[];
  setMessages: Function;
}

const socket = io("http://localhost:4000");

const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  rooms: {},
  messages: [],
  setMessages: () => false,
});

function SocketProvider(props: any) {
  const [username, setUsername] = useState("");
  const [rooms, setRooms] = useState<Record<string, { name: string }>>({});
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);

    //reset message cu
    setMessages([]);
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      setMessages((messages) => [...messages, { message, username, time }]);
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    ></SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
