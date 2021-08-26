import express from "express";
import http from "http";
import { Server } from "socket.io";
import socket from "./socket";

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

app.get("/", (req, res) => {
  res.send("Hello from server hi");
});

server.listen(4000, () => {
  console.log("App listening at port 4000");

  socket({ io });
});
