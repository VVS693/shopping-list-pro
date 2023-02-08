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

export function AllLists() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.itemsReducer);
  const navigate = useNavigate();

  const onSortHandler = () => {
    animateScroll.scrollToTop({
      duration: 1000,
      smooth: "easeInQuad",
    });
    dispatch(sortItemsArray());
    dispatch(fetchAllSortedItems());
    dispatch(fetchAllUsers())
  };

  const onShowAllCommentsHandler = () => {
    dispatch(showAllComments());
  };

  return (
    <div className="container mx-auto max-w-md pb-20">
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <Header isLoading={isLoading} title="Shopping List Pro"/>
      )}

      <MyLists />


      <FooterMenu
        onChatClick={() => navigate("/chat")}
        onSortClick={onSortHandler}
        onShowCommentsClick={onShowAllCommentsHandler}
        onAddItemClick={() => {}}
      />
    </div>
  );
}
