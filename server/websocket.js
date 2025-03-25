import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { ACCESS_KEY } from "./constants/tokens.js";

export default function initializeSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const { username } = socket.handshake.headers;
    console.log(`Conectado: ${username}`);

    socket.on("join room", (room) => {
      socket.join(room);
      console.log(`${username} joined ${room}`);
    });

    socket.on("send message", ({ room, message }) => {
      console.log(`Message from ${username} on ${room}: ${message}`);
      io.to(room).emit("receive message", {
        username: username,
        message,
      });
    });

    socket.on("leave room", (room) => {
      socket.leave(room);
      console.log(`${username} leave ${room}`);
    });
  });

  return io;
}
