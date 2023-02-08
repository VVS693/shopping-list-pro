import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { unlink } from "node:fs/promises";
import { __dirname } from "../index.js";
import UserModel from "../models/User.js";

import { secretWord } from "../config/config.js";

export const uploadAvatarImage = async (req, res) => {
  try {
    console.log("File uploaded successfully");
    res.json({
      url: req.file.originalname,
      text: "File uploaded successfully",
    });
  } catch (error) {
    console.error("there was an error: ", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const delOldAvatarImage = async (req, res) => {
  try {
    await unlink(`${__dirname}/avatars/${req.params.avatar}`);
    console.log("successfully deleted");
    res.json({
      success: "successfully deleted",
    });
  } catch (error) {
    console.error("there was an error: ", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      name: req.body.name,
      passwordHash: hash,
      avatar: req.body.avatar,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      secretWord,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to register user",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ name: req.body.name });

    if (!user) {
      return res.status(404).json({
        message: "User not found...",
      });
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Login or password is incorrect...",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      secretWord,
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to log in...",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found...",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "No access...",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get users!",
    });
  }
};

export const updateUserName = async (req, res) => {
  try {
    const user = await UserModel.findOne({ name: req.body.name });
    const userMe = await UserModel.findOne({ _id: req.body._id });
    if (user && !(user._doc.name === userMe._doc.name)) {
      return res.status(404).json({
        message: "This name is already taken...",
      });
    }
    await UserModel.updateOne(
      {
        _id: req.body._id,
      },
      {
        name: req.body.name,
      }
    );
    res.json({
      _id: req.body._id,
      name: req.body.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update user name...",
    });
  }
};

export const updateUserAvatar = async (req, res) => {
  try {
    await UserModel.updateOne(
      {
        _id: req.body._id,
      },
      {
        avatar: req.body.avatar,
      }
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update user avatar...",
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.body._id });

    if (req.body.newPassword) {
      const isValidPass = await bcrypt.compare(
        req.body.currentPassword,
        user._doc.passwordHash
      );

      if (!isValidPass) {
        return res.status(400).json({
          message: "Current password is incorrect...",
        });
      }

      if (req.body.name !== "") {
        const user = await UserModel.findOne({ name: req.body.name });
        const userMe = await UserModel.findOne({ _id: req.body._id });

        if (user && !(user._doc.name === userMe._doc.name)) {
          return res.status(404).json({
            message: "This name is already taken...",
          });
        }
        await UserModel.updateOne(
          {
            _id: req.body._id,
          },
          {
            name: req.body.name,
          }
        );
      }

      const newPassword = req.body.newPassword;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      await UserModel.updateOne(
        {
          _id: req.body._id,
        },
        {
          passwordHash: hash,
        }
      );
    }
    res.json({
      success: "true All",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update user or password!",
    });
  }
};
