import { ErrorMessage } from "../components/elements/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchAddItems,
  fetchAllSortedItems,
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

export function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, error, items } = useAppSelector(
    (state) => state.itemsReducer
  );
  const { currentList } = useAppSelector((state) => state.listsReducer);
  const navigate = useNavigate();

  const onSortHandler = () => {
    animateScroll.scrollToTop({
      duration: 750,
      smooth: "easeInQuad",
    });
    dispatch(sortItemsArray());
    dispatch(fetchAllSortedItemsByListId(currentList?._id));
    // dispatch(fetchAllSortedItems());
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
    navigate("/lists");
  };

  const isShared = () => {
    return !!currentList.usersSharing?.length;
  };

  const onDeleteClickHandle = () => {
    console.log("delete list");
    // setIsDeleteListModalApproveOpen(true);
    // setalertDialogText(
    //   "Are you sure you want to delete this list? All elements will be removed!"
    // );
  };

  const titleHeader = (
    <div className="flex relative items-center right-4">
      <ListMoreMenu
        isShared={true}
        onDeleteClick={onDeleteClickHandle}
        positionHorisontal="left"
      />
      <Typography variant="inherit" noWrap>
        {currentList?.title}
      </Typography>
    </div>
  );

  return (
    <div className="container mx-auto max-w-md pb-20">
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <Header
          isLoading={isLoading}
          title={titleHeader}
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
          isShared={isShared()}
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
