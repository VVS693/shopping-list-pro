// server/index.js

import express from "express";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";
import * as UserController from "./server/controllers/UserController.js";
import * as ItemController from "./server/controllers/ItemController.js";
import checkAuth from "./server/middlewares/checkAuth.js";
import fs from "fs";
import https from "https"

const PORT = process.env.PORT || 3001;
export const __dirname = path.resolve();

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://vvs694:vvs694@cluster0.wqbcv20.mongodb.net/sl?retryWrites=true&w=majority"
  )
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

const options = {
  cert: fs.readFileSync("./server/sslcert/sl.vvs693.ru_2023-01-26-16-08_14.crt"),
  key: fs.readFileSync("./server/sslcert/sl.vvs693.ru_2023-01-26-16-08_14.key")
};

app.use(express.json());

// const corsOptions = {
//   origin: "http://localhost:3000",
// };
// app.use(cors(corsOptions));

app.use(cors());

console.log(path.resolve(__dirname, "avatars"));
console.log(path.resolve(__dirname, "../frontend/build"));

app.use(express.static(path.resolve(__dirname, "avatars")));
app.use(express.static(path.resolve(__dirname, "avatars/default")));
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

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

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
});

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
