import ListModel from "../models/List.js";



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
      id: req.body.id,
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
