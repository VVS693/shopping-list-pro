import { io, Socket } from "socket.io-client";
import { IMessage, IUsersOnline } from "./types";

interface ServerToClientEvents {
  noArg: () => void;
  messageResponse: (callback: (data: IMessage) => void) => void;
  newUserResponse: (data: IUsersOnline) => void;
}

interface ClientToServerEvents {
  newUser: (data: IUsersOnline) => void;
  message: (data: IMessage) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const initiateSocketConnection = () => {
  socket = io("http://localhost:3001");
  // socket = io("https://sl.vvs693.ru");
  console.log(`Connecting socket...`);
  socket.on("connect", () => {});
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const messageResponse = (cb: any) => {
  if (!socket) return true;
  socket.on("messageResponse", (data) => {
    console.log("Message received!");
    return cb(data);
  });
};

export const newUser = (userId: string) => {
  socket.on("connect", () => {
    const data: IUsersOnline = { userId, socketId: socket.id };
    if (socket) socket.emit("newUser", data);
  });
};

export const sendMessage = (data: IMessage) => {
  if (socket) socket.emit("message", data);
};

export const usersOnlineResponse = (cb: any) => {
  if (!socket) return true;
  socket.on("newUserResponse", (data) => {
    console.log("Users online received!");
    return cb(data);
  });
};
