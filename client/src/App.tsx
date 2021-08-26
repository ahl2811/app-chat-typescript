import React from "react";
import SocketProvider from "./context/socket.context";
import Home from "./pages/Home";

//Ket noi socket

function App() {
  return (
    <SocketProvider>
      <Home />
    </SocketProvider>
  );
}

export default App;
