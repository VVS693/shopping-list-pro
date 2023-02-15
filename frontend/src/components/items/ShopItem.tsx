import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchDeleteItems,
  fetchEditItems,
} from "../../store/reducers/actionsItemsCreators";
import {
  deleteItemArray,
  editItemArray,
} from "../../store/reducers/itemsSlice";
import { IComment, IShopItem } from "../../types";
import { CheckBox } from "./Checkbox";
import { CommentsList } from "../comments/CommentsList";
import { ItemEdit } from "./ItemEdit";
import { ItemTitle } from "./ItemTitle";
import IconButton from "@mui/material/IconButton";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import CommentsDisabledOutlinedIcon from "@mui/icons-material/CommentsDisabledOutlined";

interface ShopItemProps {
  item: IShopItem;
}

export function ShopItem({ item }: ShopItemProps) {
  const dispatch = useAppDispatch();
  const { isShowComments } = useAppSelector((state) => state.itemsReducer);
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(isShowComments);
  const [addNewComment, setAddNewComment] = useState(false);

  const handleItemDel = () => {
    dispatch(deleteItemArray(item));
    dispatch(fetchDeleteItems(item));
  };

  const toggleCompleted = () => {
    const itemData: IShopItem = {
      ...item,
      completed: !item.completed,
    };
    dispatch(editItemArray(itemData));
    dispatch(fetchEditItems(itemData));
  };

  const handleItemEdit = (value: string) => {
    const itemData: IShopItem = structuredClone(item);
    itemData.title = value;
    dispatch(editItemArray(itemData));
    dispatch(fetchEditItems(itemData));
  };

  const allCommentsUpdateHandler = (allCommentsData: IComment[]) => {
    const itemData: IShopItem = structuredClone(item);
    itemData.comments = allCommentsData;
    if (allCommentsData.length === 0) {
      setTimeout(() => {
        setShowComments(false);
      }, 750);
    }
    dispatch(editItemArray(itemData));
    dispatch(fetchEditItems(itemData));
  };

  useEffect(() => setShowComments(isShowComments), [isShowComments]);

  return (
    <div className="flex flex-col items-start pl-4 pr-4 border-b">
      <div className="flex items-center w-full justify-between">
        <CheckBox
          isCompleted={item.completed}
          onChangeCheckBox={toggleCompleted}
        />

        {isEditing ? (
          <ItemEdit
            title={item.title}
            onEdit={(el) => {
              setIsEditing(false);
              handleItemEdit(el);
            }}
            onDel={handleItemDel}
          />
        ) : (
          <ItemTitle
            title={item.title}
            onClick={() => {
              setIsEditing(true);
            }}
          />
        )}

        <div className="">
          {!!item.comments?.length && !isEditing ? (
            <>
              {!showComments ? (
                <IconButton
                  onClick={() => {
                    setShowComments(!showComments);
                    setAddNewComment(false);
                  }}
                >
                  <CommentOutlinedIcon color="action" />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setShowComments(!showComments);
                    setAddNewComment(false);
                  }}
                >
                  <CommentsDisabledOutlinedIcon color="action" />
                </IconButton>
              )}
            </>
          ) : (
            !isEditing && (
              <IconButton
                onClick={() => {
                  setShowComments(true);
                  setAddNewComment(true);
                }}
              >
                <AddCommentOutlinedIcon color="action" />
              </IconButton>
            )
          )}
        </div>
      </div>

      {showComments && (
        <CommentsList
          comments={item.comments}
          onCommentsUpdate={allCommentsUpdateHandler}
          onAddNewComment={addNewComment}
          onAddNewCommentCancel={() => {
            setAddNewComment(false);
          }}
        />
      )}
    </div>
  );
}
