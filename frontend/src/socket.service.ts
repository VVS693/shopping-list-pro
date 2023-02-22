import { io, Socket } from "socket.io-client";
import { IMessage, IUsersJoinRoom, IUsersOnline, IUserTyping } from "./types";

interface ServerToClientEvents {
  noArg: () => void;
  messageResponse: (callback: (data: IMessage) => void) => void;
  newUserResponse: (data: IUsersOnline) => void;
  userTypingResponse: (data: IUsersJoinRoom) => void
}

interface ClientToServerEvents {
  newUser: (data: IUsersOnline) => void;
  message: (data: IMessage) => void;
  joinListChat: (data: IUsersJoinRoom) => void
  userTyping: (data: IUsersJoinRoom) => void
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const initiateSocketConnection = () => {
  socket = io("http://localhost:3001");
  // socket = io("https://sl.vvs693.ru");
  // console.log(`Connecting socket...`);
  socket.on("connect", () => {});
};

export const disconnectSocket = () => {
  // console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const messageResponse = (cb: any) => {
  if (!socket) return true;
  socket.on("messageResponse", (data) => {
    // console.log("Message received!");
    return cb(data);
  });
};

export const joinListChat = (userId: string, roomId: string) => {
	socket.emit("joinListChat", {userId, roomId});
}

export const newUser = (userId: string, roomId: string) => {
  socket.on("connect", () => {
    const data: IUsersOnline = { userId, socketId: socket.id, roomId: roomId };
    if (socket) socket.emit("newUser", data);
  });
};

export const sendMessage = (data: IMessage) => {
  if (socket) socket.emit("message", data);
};

export const userTyping = (data: IUserTyping) => {
  if (socket) socket.emit("userTyping", data);
};

export const usersOnlineResponse = (cb: any) => {
  if (!socket) return true;
  socket.on("newUserResponse", (data) => {
    // console.log("Users online received!");
    return cb(data);
  });
};

export const userTypingResponse = (cb: any) => {
  if (!socket) return true;
  socket.on("userTypingResponse", (data) => {
    // console.log("Users online received!");
    return cb(data);
  });
};
