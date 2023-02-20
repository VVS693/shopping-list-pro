import { useEffect, useState } from "react";
import {
  fetchAllLists,
  fetchAmountDocsByListId,
  fetchCreatedDateByListId,
  fetchDeleteList,
  fetchLatestUpdateOfDocsByListId,
} from "../store/reducers/actionsListsCreators";
import { deleteList } from "../store/reducers/listsSlice";
import { IListItem, IShopItem } from "../types";
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

  const onDeleteListHandle = async () => {
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
    onDeleteListHandle,
    cancelHandler,
  };
};

export const useListData = (list: IListItem, items?: IShopItem[]) => {
  const dispatch = useAppDispatch();
  const [amountElements, setAmountElements] = useState(0);
  const [updatedAt, setUpdatedAt] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  useEffect(() => {
    const resultAmount = async () => {
      const itemsAmount = await dispatch(fetchAmountDocsByListId(list));
      if (typeof itemsAmount.payload === "number")
        setAmountElements(itemsAmount.payload);
    };
    resultAmount();
    const resultUpdate = async () => {
      const lastDate = await dispatch(fetchLatestUpdateOfDocsByListId(list));
      if (typeof lastDate.payload === "string") setUpdatedAt(lastDate.payload);
    };
    resultUpdate();
    const resultCreated = async () => {
      const createDate = await dispatch(fetchCreatedDateByListId(list));
      if (typeof createDate.payload === "string")
        setCreatedAt(createDate.payload);
    };
    resultCreated();
  }, [list, items]);
  return { amountElements, updatedAt, createdAt };
};
