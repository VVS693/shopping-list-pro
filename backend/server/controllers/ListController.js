import ListModel from "../models/List.js";
import ItemModel from "../models/Item.js";

// export const removeItem = async (req, res) => {
//   try {
//     const itemId = req.params.id;
//     ItemModel.findOneAndDelete(
//       {
//         id: itemId,
//       },
//       (err, doc) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({
//             message: "Failed to delete item!",
//           });
//         }
//         if (!doc) {
//           return res.status(404).json({
//             message: "Item not found!",
//           });
//         }
//         res.json({
//           success: true,
//         });
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Failed to get item!",
//     });
//   }
// };

// export const updateItem = async (req, res) => {
//   try {
//     const itemId = req.params.id;
//     await ItemModel.updateOne(
//       {
//         id: itemId,
//       },
//       {
//         completed: req.body.completed,
//         title: req.body.title,
//         comments: req.body.comments,
//       }
//     );

//     res.json({
//       success: true,
//     });
//   } catch (error) {
//     console.log(err);
//     res.status(500).json({
//       message: "Failed to update item!",
//     });
//   }
// };

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
    console.log(req.params);
    const listId = req.params.id;
    await ListModel.updateOne(
      {
        _id: listId,
      },
      {
        title: req.body.title,
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
