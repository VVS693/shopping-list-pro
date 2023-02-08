// server/index.js

import express from "express";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import * as UserController from "./controllers/UserController.js";
import * as ItemController from "./controllers/ItemController.js";
import * as MessageController from "./controllers/MessageController.js"
import checkAuth from "./middlewares/checkAuth.js";
import { MY_MONGO_DB } from "./config/config.js";
// import fs from "fs";
// import https from "https"

import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3001;
export const __dirname = path.resolve();

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

// const options = {
//   cert: fs.readFileSync("./server/sslcert/sl.vvs693.ru_2023-01-26-16-08_14.crt"),
//   key: fs.readFileSync("./server/sslcert/sl.vvs693.ru_2023-01-26-16-08_14.key")
// };

app.use(express.json());

// const corsOptions = {
//   origin: "http://localhost:3000",
// };
// app.use(cors(corsOptions));

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
  console.log(`User connected on socket: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User disconnected ");
    usersOnline = usersOnline.filter((el) => el.socketId !== socket.id)
    io.emit("newUserResponse", usersOnline);
  });

  socket.on("message", (data) => {
    io.emit("messageResponse", data);
    MessageController.createMessage(data)
    // console.log(data)
  });

  socket.on("newUser", (data) => {
    if (!usersOnline.find(el => el.userId === data.userId)) {
      usersOnline.push(data);
    }
    io.emit("newUserResponse", usersOnline);
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

app.get("/items", checkAuth, ItemController.getAllItems);
app.post("/items", checkAuth, ItemController.createItem);
app.delete("/items/:id", checkAuth, ItemController.removeItem);
app.patch("/items/:id", checkAuth, ItemController.updateItem);

app.get("/messages", checkAuth, MessageController.getAllMessages);
// app.post("/messages", checkAuth, MessageController.createMessage);


// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
// });

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

// https.createServer(options, app).listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });
