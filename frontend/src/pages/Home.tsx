import { ErrorMessage } from "../components/elements/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchAddItems,
  fetchAllSortedItemsByListId,
} from "../store/reducers/actionsItemsCreators";
import {
  addItemArray,
  setInitialItems,
  showAllComments,
  sortItemsArray,
} from "../store/reducers/itemsSlice";
import { Header } from "../components/elements/Header";
import { animateScroll } from "react-scroll";
import { FooterMenu } from "../components/elements/FooterMenu";
import { ItemsList } from "../components/items/ItemsList";
import { fetchAllUsers } from "../store/reducers/actionUserCreators";
import { useNavigate } from "react-router-dom";
import { IShopItem } from "../types";
import { v4 } from "uuid";
import Typography from "@mui/material/Typography";
import { ListMoreMenu } from "../components/lists/ListMoreMenu";
import { setInitialLists } from "../store/reducers/listsSlice";
import { useMemo, useState } from "react";
import { AlertDialog } from "../components/elements/AlertDialog";
import { useDeleteList } from "../hooks/deleteList";

export function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, error, items } = useAppSelector(
    (state) => state.itemsReducer
  );
  const { currentList } = useAppSelector((state) => state.listsReducer);
  const {
    alertDialogText,
    isDeleteListModalApproveOpen,
    onDeleteClickHandle,
    deleteListHandle,
    cancelHandler,
  } = useDeleteList(currentList);

  const navigate = useNavigate();

  const onSortHandler = () => {
    dispatch(sortItemsArray());
    setTimeout(() => {
      dispatch(fetchAllSortedItemsByListId(currentList?._id));
      animateScroll.scrollToTop({
        duration: 500,
        smooth: "easeInQuad",
      });
    }, 750);
    dispatch(fetchAllUsers());
  };

  const onShowAllCommentsHandle = () => {
    dispatch(showAllComments());
  };

  const onAddItemHandle = (value: string) => {
    const itemData: IShopItem = {
      id: v4(),
      completed: false,
      title: value,
      listId: currentList?._id,
    };
    dispatch(addItemArray(itemData));
    dispatch(fetchAddItems(itemData));
  };

  const onBackClickHandle = () => {
    dispatch(setInitialItems());
    dispatch(setInitialLists());
    navigate("/lists");
  };

  const isShared = useMemo(
    () => !!currentList.usersSharing?.length,
    [currentList.usersSharing?.length]
  );

  // const titleHeader = (
  //   <div className="flex relative items-center right-4">
  //     <ListMoreMenu
  //       isShared={true}
  //       onDeleteClick={onDeleteClickHandle}
  //       positionHorisontal="left"
  //     />
  //     <Typography variant="inherit" noWrap>
  //       {currentList?.title}
  //     </Typography>
  //   </div>
  // );

  const TitleHeader = () => {
    return (
      <div className="flex relative items-center right-4">
        <ListMoreMenu
          isShared={isShared}
          onDeleteClick={onDeleteClickHandle}
          positionHorisontal="left"
        />
        <Typography variant="inherit" noWrap>
          {currentList?.title}
        </Typography>
      </div>
    );
  };

  return (
    <div className="container mx-auto max-w-md pb-20">
      <AlertDialog
        isOpen={isDeleteListModalApproveOpen}
        text={alertDialogText}
        okFunc={() => {
          deleteListHandle();
          onBackClickHandle();
        }}
        cancelFunc={cancelHandler}
      />
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <Header
          isLoading={isLoading}
          title={<TitleHeader />}
          updated={{
            updatedAt: currentList.updatedAt,
            // timeStyle: "short",
            dateStyle: "short",
          }}
          created={{
            createdAt: currentList.createdAt,
            // timeStyle: "short",
            dateStyle: "short",
          }}
          itemsAmount={items.length}
          isShared={isShared}
        />
      )}
      <ItemsList />
      <FooterMenu
        onBackClick={onBackClickHandle}
        onChatClick={() => navigate("/chat")}
        onSortClick={onSortHandler}
        onShowCommentsClick={onShowAllCommentsHandle}
        onAddItemClick={onAddItemHandle}
      />
    </div>
  );
}
