import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAllSortedItemsByListId } from "../../store/reducers/actionsItemsCreators";
import { fetchAllUsers } from "../../store/reducers/actionUserCreators";
import { ShopItem } from "./ShopItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import "./stylesItems.css";

export function ItemsList() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.itemsReducer);
  const { currentList } = useAppSelector((state) => state.listsReducer);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchAllSortedItemsByListId(currentList?._id));
  }, []);

  return (
    <TransitionGroup>
      {items.map((el) => (
        // <CSSTransition key={el.id} timeout={750} classNames="item">

        <Collapse
          key={el.id}
          timeout={{
            appear: 750,
            enter: 750,
            exit: 750,
          }}
        >
          <ShopItem item={el} />
        </Collapse>

        // {/* </CSSTransition>  */}
      ))}
    </TransitionGroup>
  );
}
