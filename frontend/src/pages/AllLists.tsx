import { ErrorMessage } from "../components/elements/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAllSortedItems } from "../store/reducers/actionsItemsCreators";
import { showAllComments, sortItemsArray } from "../store/reducers/itemsSlice";
import { Header } from "../components/elements/Header";
import { animateScroll } from "react-scroll";
import { FooterMenu } from "../components/elements/FooterMenu";
import { ItemsList } from "../components/items/ItemsList";
import { fetchAllUsers } from "../store/reducers/actionUserCreators";
import { useNavigate } from "react-router-dom";
import { MyLists } from "../components/lists/MyLists";
import { FooterMenuList } from "../components/lists/FooterMenuList";
import { v4 } from "uuid";
import { IListItem } from "../types";
import { addList } from "../store/reducers/listsSlice";
import { fetchAddList } from "../store/reducers/actionsListsCreators";

export function AllLists() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.listsReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const onSortHandler = () => {
    animateScroll.scrollToTop({
      duration: 1000,
      smooth: "easeInQuad",
    });
    // dispatch(sortItemsArray());
    // dispatch(fetchAllSortedItems());
    // dispatch(fetchAllUsers())
  };

  const onAddListHandler = (value: string) => {
    const listData: IListItem = {
      // id: v4(),
      _id: v4(),
      title: value,
      userOwner: user._id,
    };
    // dispatch(addList(listData));
    dispatch(fetchAddList(listData));
  };
  const TitleHeader = () => {
    return (
      <div className="flex  items-center py-1">
          Shopping List Pro
      </div>
    );
  };

  return (
    <div className="container mx-auto max-w-md pb-20">
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <Header isLoading={isLoading} title={<TitleHeader/>} />
      )}

      <MyLists />

      <FooterMenuList
        onSortClick={onSortHandler}
        onAddItemClick={onAddListHandler}
      />
    </div>
  );
}
