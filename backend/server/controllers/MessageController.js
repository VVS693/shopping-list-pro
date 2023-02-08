import MessageModel from "../models/Messages.js";

export const getAllMessages = async (req, res) => {
    try {
      const messages = await MessageModel.find();
      res.json(messages);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to get messages!",
      });
    }
  };

  export const createMessage = async (data) => {
    try {
      const doc = new MessageModel({
        id: data.id,
        text: data.text,
        userId: data.userId,
        creationTime: data.creationTime,
      });
      const post = await doc.save();
    } catch (err) {
      console.log(err);
    }
  };