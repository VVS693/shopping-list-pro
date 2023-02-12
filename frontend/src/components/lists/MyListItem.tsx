import { useRef, useState } from "react";
import { IComment, IListItem, IUser } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UserAvatar } from "../user/UserAvatar";
import { ItemEdit } from "../items/ItemEdit";
import { ItemTitle } from "../items/ItemTitle";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { ListMoreMenu } from "./ListMoreMenu";
import {
  deleteList,
  editList,
  setCurrentList,
} from "../../store/reducers/listsSlice";
import {
  fetchAllLists,
  fetchDeleteList,
  fetchEditList,
} from "../../store/reducers/actionsListsCreators";
import { useNavigate } from "react-router-dom";
import { AlertDialog } from "../elements/AlertDialog";
import Divider from "@mui/material/Divider";

interface MyListItemProps {
  listItem: IListItem;
  dateLabelMark?: string;
  onListEdit: (data: IComment) => void;
  onListDel: (idComment: string) => void;
}

export function MyListItem({
  listItem,
  dateLabelMark,
  onListEdit,
  onListDel,
}: MyListItemProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { user, users } = useAppSelector((state) => state.userReducer);
  const [isDeleteListModalApproveOpen, setIsDeleteListModalApproveOpen] =
    useState(false);
  const [alertDialogText, setalertDialogText] = useState("");
  const dispatch = useAppDispatch();

  const listEditHandle = (value: string) => {
    setIsEditing(false);
    const listData: IListItem = {
      ...listItem,
      title: value,
    };
    dispatch(editList(listData));
    dispatch(fetchEditList(listData));
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

  const itemsCount = (listId: string) => {

  }

  const onEditTitleClickHandle = () => {
    setTimeout(() => {
      setIsEditing(true);
    }, 0);
  };

  const onGoListHandle = () => {
    dispatch(setCurrentList(listItem));
    navigate("/");
  };

  const onDeleteClickHandle = () => {
    setIsDeleteListModalApproveOpen(true);
    setalertDialogText(
      "Are you sure you want to delete this list? All elements will be removed!"
    );
  };

  const deleteListHandle = async () => {
    await dispatch(fetchDeleteList(listItem));
    cancelHandler();
    dispatch(deleteList(listItem));
    dispatch(fetchAllLists());
    
  };

  // const userExitModalOpen = async () => {
  //   setAlertDialogExitOpen(true);
  //   setalertDialogText("Are you sure you want to exit?");
  // };

  const cancelHandler = () => {
    setIsDeleteListModalApproveOpen(false);
  };

  return (
    <div className="relative flex flex-col items-start pl-4 pr-4 border-b">
      <AlertDialog
        isOpen={isDeleteListModalApproveOpen}
        text={alertDialogText}
        okFunc={deleteListHandle}
        cancelFunc={cancelHandler}
      />
      <div className="flex items-center w-full justify-between pb-3">
        {isShared.current ? (
          <ShareIcon color="action" />
        ) : (
          <div className="pl-6" />
        )}

        {isEditing ? (
          <ItemEdit title={listItem.title} onEdit={listEditHandle} />
        ) : (
          <ItemTitle title={listItem.title} onClick={onGoListHandle} />
        )}

        <ListMoreMenu
          isShared={isShared.current}
          onEditTitleClick={onEditTitleClickHandle}
          onDeleteClick={onDeleteClickHandle}
        />
      </div>

      <div className="select-none absolute bottom-1 flex">
        {!!(dateLabelMark === "createdAt") && (
          <div className="select-none pl-10 pr-2 text-xs font-extralight text-light-blue-800">
            {`Created at: ${dateLabel(listItem.createdAt)}`}
          </div>
        )}
        {!!(dateLabelMark === "updatedAt") && (
          <div className="select-none pl-10 pr-2 text-xs font-extralight text-light-blue-800">
            {`Update at: ${dateLabel(listItem.updatedAt)}`}
          </div>
        )}
        <Divider orientation="vertical" flexItem />
          <div className="pl-2 select-none text-xs font-extralight text-light-blue-800">
            {`Items: `}
          </div>

      </div>
    </div>
  );
}
