import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { ACCESS_KEY } from "./constants/tokens.js";
import { MessageService } from "./services/messageService.js";

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

    socket.on("send message", async ({ room, message }) => {
      console.log(`Message from ${username} on ${room}: ${message}`);
      try {
        const newMessage = await MessageService.create({
          username,
          chatName: room,
          content: message,
        });
        if (!newMessage) throw new Error("Couldn't create new message.");
        io.to(room).emit("receive message", {
          username,
          message: newMessage,
        });
      } catch (e) {
        console.log(e);
      }
    });

    socket.on("leave room", (room) => {
      socket.leave(room);
      console.log(`${username} leave ${room}`);
    });
  });

  return io;
}
