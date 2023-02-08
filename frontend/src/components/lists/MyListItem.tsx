import { useState } from "react";
import { IComment, IListItem, IUser } from "../../types";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { useAppSelector } from "../../hooks/redux";
import { UserAvatar } from "../user/UserAvatar";
import { ItemEdit } from "../items/ItemEdit";
import { ItemTitle } from "../items/ItemTitle";

interface MyListItemProps {
  listItem: IListItem;
  onListEdit: (data: IComment) => void;
  onListDel: (idComment: string) => void;
}

export function MyListItem({
  listItem,
  onListEdit,
  onListDel
}: MyListItemProps) {

  const [isEditing, setIsEditing] = useState(false);
  const { user, users } = useAppSelector((state) => state.userReducer);


  const listDelHandle = () => {

    console.log("delete list")

    // if (typeof comment?.idComment === "string") {
    //   onCommentDel(comment.idComment);
    // }
  };

  const listEditHandle = (value: string) => {
    setIsEditing(false);
    console.log("edit list")
    // const commentData: IComment = structuredClone(comment);
    // commentData.title = value;
    // onCommentEdit(commentData);
  };


  const whoseAvatar = (listItem: IListItem) => {
    const listUserOwner = users.find((el: IUser) => el._id === listItem.userOwner);
    return listUserOwner?.avatar
  }
  

  return (
    <div className="flexflex-col items-start pl-4 pr-3 border-b">
      <div className="flex items-center w-full">
        <div className="pb-1 pt-1">
          <UserAvatar
            isUserActive={false}
            userAvatar={whoseAvatar(listItem)}
            width={40}
            height={40}
          />
        </div>
        {isEditing ? (
          <ItemEdit
            title={listItem.title}
            onEdit={listEditHandle}
            onDel={listDelHandle}
          />
        ) : (
          <ItemTitle
            title={listItem.title}
            onClick={() => {
              setIsEditing(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
