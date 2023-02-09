import { useRef, useState } from "react";
import { IComment, IListItem, IUser } from "../../types";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { useAppSelector } from "../../hooks/redux";
import { UserAvatar } from "../user/UserAvatar";
import { ItemEdit } from "../items/ItemEdit";
import { ItemTitle } from "../items/ItemTitle";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { ListMoreMenu } from "./ListMoreMenu";
import theme from "@material-tailwind/react/theme";

interface MyListItemProps {
  listItem: IListItem;
  onListEdit: (data: IComment) => void;
  onListDel: (idComment: string) => void;
}

export function MyListItem({
  listItem,
  onListEdit,
  onListDel,
}: MyListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { user, users } = useAppSelector((state) => state.userReducer);

  const listDelHandle = () => {
    console.log("delete list");

    // if (typeof comment?.idComment === "string") {
    //   onCommentDel(comment.idComment);
    // }
  };

  const listEditHandle = (value: string) => {
    setIsEditing(false);
    console.log("edit list");
    // const commentData: IComment = structuredClone(comment);
    // commentData.title = value;
    // onCommentEdit(commentData);
  };

  // const whoseAvatar = (listItem: IListItem) => {
  //   const listUserOwner = users.find(
  //     (el: IUser) => el._id === listItem.userOwner
  //   );
  //   return listUserOwner;
  // };

  // const isShared = (listItem: IListItem) => {
  //   const isShared = listItem.usersSharing?.length > 0 ? true : false
  //   return isShared
  // }

  const isShared = useRef<boolean>(!!listItem.usersSharing?.length);

  const dateLabel = (date: string | undefined) => {
    const dataLabel: string = date
      ? new Date(Date.parse(date)).toLocaleString("en-GB", {
          timeStyle: "short",
          dateStyle: "short",
        })
      : "";
    return dataLabel;
  };

  return (
    <div className="flex flex-col items-start pl-4 pr-4 border-b">
      <div className="flex items-center w-full justify-between">
        {/* {whoseAvatar(listItem)?._id !== user._id && (<div className="pb-1 pt-1 pl-2">
          <UserAvatar
            isUserActive={false}
            userAvatar={whoseAvatar(listItem)?.avatar}
            width={40}
            height={40}
          />
        </div>)} */}

        {isShared.current ? (
          <ShareIcon color="action" />
        ) : (
          <div className="pl-6" />
        )}

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

        {/* <IconButton onClick={() => {}}>
          <MoreVertIcon className="text-blue-gray-800" />
        </IconButton> */}

        <ListMoreMenu isShared={isShared.current} />
      </div>

      <div className="pb-1 pl-10 text-xs font-extralight text-light-blue-800">
        {dateLabel(listItem.createdAt)}
      </div>
      <div className="pb-1 pl-10 text-xs font-extralight text-light-blue-800">
        {dateLabel(listItem.updatedAt)}
      </div>
    </div>
  );
}
