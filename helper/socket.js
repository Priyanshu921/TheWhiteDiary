import { Server } from "socket.io";
let io;
export const socket = {
  io: (server) => {
    io = new Server(server, { cors: { origin: "*" } });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized");
    }
    return io;
  },
};
