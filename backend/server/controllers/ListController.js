import ListModel from "../models/List.js";
import ItemModel from "../models/Item.js";
import MessageModel from "../models/Messages.js";


export const getAllLists = async (req, res) => {
  try {
    const lists = await ListModel.find();
    res.json(lists);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get lists!",
    });
  }
};

export const getAllUsersLists = async (req, res) => {
  // console.log(req.params)

  try {
    const lists = await ListModel.find({
      $or: [
        { userOwner: req.params.id },
        { "usersSharing.userId": req.params.id },
      ],
    }).sort({ usersSharing: 1 });
    res.json(lists);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get User's lists!",
    });
  }
};

export const createList = async (req, res) => {
  try {
    const doc = new ListModel({
      // id: req.body.id,
      title: req.body.title,
      userOwner: req.body.userOwner,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create list!",
    });
  }
};

export const updateList = async (req, res) => {
  try {
    // console.log(req.params);
    const listId = req.params.id;
    await ListModel.updateOne(
      {
        _id: listId,
      },
      {
        title: req.body.title,
        usersSharing: req.body.usersSharing,
      }
    );
    const list = await ListModel.findOne({ _id: req.body._id });
    res.json(list);
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "Failed to update list!",
    });
  }
};

export const removeList = async (req, res) => {
  try {
    const listId = req.params.id.trim();
    const deletedCount = await ItemModel.deleteMany({
      listId: listId,
    });
    await MessageModel.deleteMany({
      roomId: listId,
    })
    await ListModel.findOneAndDelete({
      _id: listId,
    });
    res.json(deletedCount);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to delete list!",
    });
  }
};

export const getAmountDocsByListId = async (req, res) => {
  try {
    const listId = req.params.id.trim();
    const amount = await ItemModel.count({ listId: listId });
    res.json(amount);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to count elements of list!",
    });
  }
};

export const getNewestDocDateByListId = async (req, res) => {
  try {
    const listId = req.params.id;
    const newestElement = await ItemModel.find({ listId: listId })
      .sort({ updatedAt: -1 })
      .limit(1);
    if (newestElement.length !== 0) {
      res.json(newestElement[0].updatedAt);
    } else {
      const nowUpdate = "";
      res.json(nowUpdate);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get latest update of list!",
    });
  }
};

export const getCreatedDateByListId = async (req, res) => {
  try {
    const listId = req.params.id;
    const list = await ListModel.findOne({ _id: listId });
    res.json(list.createdAt);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get created date of list!",
    });
  }
};
