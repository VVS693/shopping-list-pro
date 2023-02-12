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
import Fade from "@mui/material/Fade";

export function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.itemsReducer);
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
    dispatch(setInitialItems())
    navigate("/lists")
  }

  return (
    <div className="container mx-auto max-w-md pb-20">
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <Header isLoading={isLoading} title={currentList?.title} />
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
