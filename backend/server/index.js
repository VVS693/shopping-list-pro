// server/index.js

import express from "express";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import * as UserController from "./controllers/UserController.js";
import * as ItemController from "./controllers/ItemController.js";
import * as MessageController from "./controllers/MessageController.js";
import * as ListController from "./controllers/ListController.js";
import checkAuth from "./middlewares/checkAuth.js";
import { MY_MONGO_DB } from "./config/config.js";
// import fs from "fs";
// import https from "https"

import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3001;
export const __dirname = path.resolve();
console.log(__dirname);
mongoose.set("strictQuery", false);
mongoose
  .connect(MY_MONGO_DB)
  .then(() => console.log("ShoppingList database OK!"))
  .catch((err) => console.log("Database error", err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "avatars");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });

const app = express();

app.use(express.json());

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let usersOnline = [];

io.on("connection", (socket) => {
  // console.log(`User connected on socket: ${socket.id}`);

  socket.on("joinListChat", (data) => {
    const { userId, roomId } = data;
    socket.join(roomId);
    // console.log("Join room " + roomId)
  });

  socket.on("disconnect", () => {
    // console.log("User disconnected ");
    usersOnline = usersOnline.filter((el) => el.socketId !== socket.id);
    // console.log(usersOnline)
    io.emit("newUserResponse", usersOnline);
  });

  socket.on("message", (data) => {
    io.to(data.roomId).emit("messageResponse", data);
    MessageController.createMessage(data);
    // console.log(data)
  });

  socket.on("newUser", (data) => {
    usersOnline.push(data);
    // console.log(usersOnline)
    io.emit("newUserResponse", usersOnline);
  });

  socket.on("userTyping", (data) => {
    // console.log(data)
    io.to(data.roomId).emit("userTypingResponse", data);
    // console.log("Typing... " + data.userId)
  });

  // We can write our socket event listeners in here...
});

app.use(express.static(path.resolve(__dirname, "avatars")));
app.use(express.static(path.resolve(__dirname, "avatars/default")));
// app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.post("/auth/login", UserController.login);
app.post("/auth/register", UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);
app.get("/auth/all", checkAuth, UserController.getAllUsers);

app.patch("/auth/update/name", checkAuth, UserController.updateUserName);
app.patch("/auth/update/avatar", checkAuth, UserController.updateUserAvatar);

app.patch("/auth/password", checkAuth, UserController.updatePassword);

app.post(
  "/avatars/",
  checkAuth,
  upload.single("image"),
  UserController.uploadAvatarImage
);
app.delete("/avatars/:avatar", checkAuth, UserController.delOldAvatarImage);

app.delete("/auth/delete/:id", checkAuth, UserController.deleteUserAccount);

app.get("/items", checkAuth, ItemController.getAllItems);
app.post("/items", checkAuth, ItemController.createItem);
app.delete("/items/:id", checkAuth, ItemController.removeItem);
app.patch("/items/:id", checkAuth, ItemController.updateItem);
app.get("/items/lists/:id", checkAuth, ItemController.getItemsByListId);

app.get("/messages/:id", checkAuth, MessageController.getAllMessages);

app.get("/lists", checkAuth, ListController.getAllLists);
app.get("/lists/:id", checkAuth, ListController.getAllUsersLists);
app.post("/lists", checkAuth, ListController.createList);
app.patch("/lists/:id", checkAuth, ListController.updateList);
app.delete("/lists/:id", checkAuth, ListController.removeList);
app.get("/lists/count/:id", checkAuth, ListController.getAmountDocsByListId);
app.get(
  "/lists/updated/:id",
  checkAuth,
  ListController.getNewestDocDateByListId
);
app.get("/lists/created/:id", checkAuth, ListController.getCreatedDateByListId);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
