import { ErrorMessage } from "../components/elements/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  fetchAddItems,
  fetchAllSortedItems,
} from "../store/reducers/actionsItemsCreators";
import {
  addItemArray,
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

export function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.itemsReducer);
  const navigate = useNavigate();

  const onSortHandler = () => {
    animateScroll.scrollToTop({
      duration: 750,
      smooth: "easeInQuad",
    });
    dispatch(sortItemsArray());
    dispatch(fetchAllSortedItems());
    dispatch(fetchAllUsers());
  };

  const onShowAllCommentsHandler = () => {
    dispatch(showAllComments());
  };

  const onAddItemHandler = (value: string) => {
    const itemData: IShopItem = {
      id: v4(),
      completed: false,
      title: value,
    };
    dispatch(addItemArray(itemData));
    dispatch(fetchAddItems(itemData));
  };


  return (
    <div className="container mx-auto max-w-md pb-20">
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <Header isLoading={isLoading} title="Shopping List" />
      )}

      <ItemsList />

      <FooterMenu
        onChatClick={() => navigate("/chat")}
        onSortClick={onSortHandler}
        onShowCommentsClick={onShowAllCommentsHandler}
        onAddItemClick={onAddItemHandler}
      />
    </div>
  );
}
