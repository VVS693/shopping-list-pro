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
  showSearchForm,
  sortItemsArray,
} from "../store/reducers/itemsSlice";
import { Header } from "../components/elements/Header";
import { animateScroll } from "react-scroll";
import { FooterMenu } from "../components/elements/FooterMenu";
import { ItemsList } from "../components/items/ItemsList";
import {
  fetchAllUsers,
  fetchUserMe,
} from "../store/reducers/actionUserCreators";
import { useNavigate } from "react-router-dom";
import { IShopItem } from "../types";
import { v4 } from "uuid";
import Typography from "@mui/material/Typography";
import { ListMoreMenu } from "../components/lists/ListMoreMenu";
import {
  setInitialLists,
  setIsShareUsersMenuOpen,
} from "../store/reducers/listsSlice";
import { useEffect, useMemo, useState } from "react";
import { AlertDialog } from "../components/elements/AlertDialog";
import { useDeleteList, useListData } from "../hooks/listHooks";
import { ShareUsersMenu } from "../components/elements/ShareUsersMenu";
import Slide from "@mui/material/Slide";
import { ListLabelMark } from "../components/lists/ListLabelMark";

export function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const { isLoading, error, items, isShowComments } = useAppSelector(
    (state) => state.itemsReducer
  );
  const { currentList, isShareUsersMenuOpen } = useAppSelector(
    (state) => state.listsReducer
  );
  const { isSearchFormVisible, isAddFormVisible } = useAppSelector((state) => state.itemsReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const {
    alertDialogText,
    isDeleteListModalApproveOpen,
    onDeleteClickHandle,
    onDeleteListHandle,
    cancelHandler,
  } = useDeleteList(currentList);

  const { updatedAt } = useListData(currentList, items);

  const onSortHandler = () => {
    dispatch(setInitialItems());
    // dispatch(sortItemsArray());
    setTimeout(() => {
      dispatch(fetchAllSortedItemsByListId(currentList._id));
      // animateScroll.scrollToTop({
      //   duration: 500,
      //   smooth: "easeInQuad",
      // });
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
      userId: user._id,
    };
    dispatch(addItemArray(itemData));
    dispatch(fetchAddItems(itemData));
  };

  const onBackClickHandle = () => {
    dispatch(setInitialItems());
    dispatch(setInitialLists());
    navigate("/mylists");
    isShowComments && dispatch(showAllComments());
  };

  const isShared = useMemo(
    () => !!currentList.usersSharing?.length,
    [currentList.usersSharing?.length]
  );
  const isMyList = useMemo(
    () => user._id === currentList.userOwner,
    [user, currentList]
  );

  const onShareClickHandle = () => {
    dispatch(setIsShareUsersMenuOpen());
  };

  const TitleHeader = () => {
    return (
      <div className="flex relative items-center right-4">
        <ListMoreMenu
          isShared={isShared}
          isMyList={isMyList}
          onDeleteClick={onDeleteClickHandle}
          onShareClick={onShareClickHandle}
          positionHorisontal="left"
        />
        <Typography variant="inherit" noWrap>
          {currentList.title}
        </Typography>
      </div>
    );
  };

  const ListLabelMarkAll = () => {
    return (
      <ListLabelMark
        updated={{
          updatedAt: updatedAt === "" ? currentList.createdAt : updatedAt,
          dateStyle: "short",
        }}
        created={{
          createdAt: currentList.createdAt,
          dateStyle: "short",
        }}
        itemsAmount={items.length}
        isShared={isShared}
      />
    );
  };

  useEffect(() => {
    if (currentList._id !== "")
      dispatch(fetchAllSortedItemsByListId(currentList?._id));

    return () => {
      dispatch(showSearchForm(false));
    };
  }, []);

  useEffect(() => {
    if (!isSearchFormVisible) setSearchValue("");
  }, [isSearchFormVisible]);

  useEffect(() => {
    if (isAddFormVisible) {
      animateScroll.scrollToBottom({
        duration: 500,
        smooth: "easeInQuad",
      })
    };
  }, [isAddFormVisible]);

  return (
    <div className="container mx-auto max-w-md min-w-[360px] pb-20">
      <AlertDialog
        isOpen={isDeleteListModalApproveOpen}
        text={alertDialogText}
        okFunc={() => {
          onDeleteListHandle();
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
          listLabelMark={<ListLabelMarkAll />}
        />
      )}
      <ItemsList searchByValue={searchValue} />

      <Slide
        direction="up"
        timeout={500}
        in={isShareUsersMenuOpen}
        mountOnEnter
        unmountOnExit
      >
        <div className=" z-50 w-full fixed top-[72px]">
          <ShareUsersMenu />
        </div>
      </Slide>
      <FooterMenu
        onBackClick={onBackClickHandle}
        onChatClick={() => navigate("/chat")}
        isChatButtonActive={currentList.usersSharing.length !== 0}
        onSortClick={onSortHandler}
        onShowCommentsClick={onShowAllCommentsHandle}
        onSearchValue={(e) => setSearchValue(e)}
        onAddItemClick={onAddItemHandle}
      />
    </div>
  );
}
