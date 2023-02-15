import { useState } from "react";
import {
  fetchAllLists,
  fetchDeleteList,
} from "../store/reducers/actionsListsCreators";
import { deleteList } from "../store/reducers/listsSlice";
import { IListItem } from "../types";
import { useAppDispatch } from "./redux";

export const useDeleteList = (list: IListItem) => {
  const dispatch = useAppDispatch();
  const [isDeleteListModalApproveOpen, setIsDeleteListModalApproveOpen] =
    useState(false);
  const [alertDialogText, setalertDialogText] = useState("");

  const onDeleteClickHandle = () => {
    setIsDeleteListModalApproveOpen(true);
    setalertDialogText(
      "Are you sure you want to delete this list? All elements will be removed!"
    );
  };

  const deleteListHandle = async () => {
    await dispatch(fetchDeleteList(list));
    cancelHandler();
    dispatch(deleteList(list));
    dispatch(fetchAllLists());
  };

  const cancelHandler = () => {
    setIsDeleteListModalApproveOpen(false);
  };

  return {
    isDeleteListModalApproveOpen,
    alertDialogText,
    onDeleteClickHandle,
    deleteListHandle,
    cancelHandler,
  };
};
