import { useEffect, useMemo, useState } from "react";
import { IListItem, IUser } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ItemEdit } from "../items/ItemEdit";
import { ItemTitle } from "../items/ItemTitle";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import { ListMoreMenu } from "./ListMoreMenu";
import {
  editList,
  setCurrentList,
} from "../../store/reducers/listsSlice";
import {
  fetchAmountDocsByListId,
  fetchEditList,
} from "../../store/reducers/actionsListsCreators";
import { useNavigate } from "react-router-dom";
import { AlertDialog } from "../elements/AlertDialog";
import { ListLabelMark } from "./ListLabelMark";
import Fade from "@mui/material/Fade";
import { useDeleteList } from "../../hooks/deleteList";

interface MyListItemProps {
  listItem: IListItem;
  dateLabelMark?: string;
}

export function MyListItem({ listItem, dateLabelMark }: MyListItemProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { user, users } = useAppSelector((state) => state.userReducer);
  const {alertDialogText, isDeleteListModalApproveOpen, onDeleteClickHandle, deleteListHandle, cancelHandler} = useDeleteList(listItem)
  const [amountElements, setAmountElements] = useState(0);

  const isShared = useMemo(
    () => !!listItem.usersSharing?.length,
    [listItem.usersSharing?.length]
  );

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

  const onEditTitleClickHandle = () => {
    setTimeout(() => {
      setIsEditing(true);
    }, 0);
  };

  const onGoListHandle = () => {
    dispatch(setCurrentList(listItem));
    navigate("/");
  };


  const itemsCount = async () => {
    const itemsAmount = await dispatch(fetchAmountDocsByListId(listItem));
    if (typeof itemsAmount.payload === "number")
      setAmountElements(itemsAmount.payload);
  };

  useEffect(() => {
    itemsCount();
  }, []);

  const animationTimeout: number = 750;

  return (
    <div className="relative flex flex-col items-start pl-0 pr-0 border-b">
      <AlertDialog
        isOpen={isDeleteListModalApproveOpen}
        text={alertDialogText}
        okFunc={deleteListHandle}
        cancelFunc={cancelHandler}
      />
      <div className="flex items-center w-full justify-between pb-3">
        {isShared ? (
          <ShareIcon
            color="action"
            fontSize="small"
            className=" relative left-2"
          />
        ) : (
          <Avatar
            sx={{ width: "20px", height: "20px", fontSize: "10px" }}
            variant="rounded"
            className=" relative left-2"
          >
            My
          </Avatar>
        )}

        {isEditing ? (
          <ItemEdit title={listItem.title} onEdit={listEditHandle} />
        ) : (
          <ItemTitle title={listItem.title} onClick={onGoListHandle} />
        )}

        <ListMoreMenu
          isShared={isShared}
          onEditTitleClick={onEditTitleClickHandle}
          onDeleteClick={onDeleteClickHandle}
          positionHorisontal="right"
        />
      </div>
      <Fade
        in={!!listItem.updatedAt || !!listItem.createdAt || !!amountElements}
        timeout={animationTimeout}
      >
        <div className="select-none absolute bottom-1 pl-8 flex">
          <ListLabelMark
            updated={{
              updatedAt: listItem.updatedAt,
              timeStyle: "short",
              dateStyle: "short",
            }}
            // created={{
            //   createdAt: listItem.createdAt,
            //   timeStyle: "short",
            //   dateStyle: "short",
            // }}
            itemsAmount={amountElements}
          />
        </div>
      </Fade>
    </div>
  );
}
